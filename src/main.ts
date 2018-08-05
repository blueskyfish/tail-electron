
import * as path from 'path';

import * as minimist from 'minimist';
import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions, BrowserWindowConstructorOptions, Rectangle } from 'electron';

import { ISettings, loadSettings, ISettingOptions, DEFAULT, saveSettings } from './settings';
import { AppChannels } from './app.channels';

/**
 * The main window of the application
 */
let mainWindow: BrowserWindow = null;

/**
 * The settings of the application
 */
let appSettings: ISettings = null;

/**
 * The options for the settings. The setting file is saved or loaded in / from the user data folder.
 */
const settingOptions: ISettingOptions = {
	path: app.getPath('userData'),
	file: 'elan-settings.json'
}

/**
 * The parameters
 */
const parsedArgs: minimist.ParsedArgs = minimist(process.argv.slice(2), {
	boolean: ['serve'],
	alias: {
		s: 'serve'
	},
	default: {
		serve: false
	}
});

// #region "Build Application Menu"

/**
 * Build the application menu
 */
const buildApplicationMenu = () => {
	const menuTemplate: MenuItemConstructorOptions[] = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Exit',
					click: () => {
						app.quit();
					}
				}
			]
		}
	];

	if (process.platform === 'darwin') {
		menuTemplate.unshift({
			label: app.getName(),
			submenu: [
				{
					role: 'about'
				},
				{
					type: 'separator'
				},
				{
					role: 'services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					role: 'hide'
				},
				{
					role: 'hideothers'
				},
				{
					role: 'unhide'
				},
				{
					type: 'separator'
				},
				{
					role: 'quit'
				}
			]
		});
	}

	const menu: Menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
};

// #endregion

// #region "Create Main Windows"

/**
 * Create the main windows
 */
const createWindow = () => {

	const windowOptions: BrowserWindowConstructorOptions = {
		x: appSettings.position.state === 'normal' && appSettings.position.x > 0 ? appSettings.position.x : undefined,
		y: appSettings.position.state === 'normal' && appSettings.position.y > 0 ? appSettings.position.y : undefined,
		height: appSettings.position.state === 'normal' && appSettings.position.height > 0 ? appSettings.position.height : DEFAULT.position.height,
		width: appSettings.position.state === 'normal' && appSettings.position.width > 0 ? appSettings.position.width : DEFAULT.position.width
	};

	mainWindow = new BrowserWindow(windowOptions);

	if (parsedArgs.serve) {
		// disable the warnings in the developer mode
		process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

		// get the frontend via http
		mainWindow.loadURL('http://localhost:5200/');
		mainWindow.webContents.openDevTools({
			mode: 'detach'
		});
		console.log('>> Start the Develope mode...');
	} else {
		mainWindow.loadFile(path.join(__dirname, '..', 'webapp', 'index.html'));
	}

	switch (appSettings.position.state) {
		case 'maximize':
			mainWindow.maximize();
			break;
		case 'minimize':
			mainWindow.minimize();
			break;
		case 'fullScreen':
			mainWindow.setFullScreen(true);
			break;
	}


	mainWindow.on('closed', () => {
		console.log('>> Closed MainWindow');
		saveSettings(settingOptions, appSettings)
			.then(() => {
				console.log('>>> Save Settings done!');
			});
		mainWindow = null;
	});

	// register the handler for the event
	// * restore
	// * resize
	// * moved
	// * leave-full-screen
	// * unmaximize
	['restore', 'resize', 'moved', 'leave-full-screen', 'unmaximize']
		.forEach((eventName) => {
			mainWindow.on(eventName as any, () => {
				console.log('>>> "%s" receive', eventName);
				const bounds: Rectangle = mainWindow.getBounds();
				appSettings.position = {
					state: 'normal',
					x: bounds.x,
					y: bounds.y,
					height: bounds.height,
					width: bounds.width
				};
			});
		});

	mainWindow.on('maximize', () => {
		appSettings.position = {
			state: 'maximize',
			x: -1,
			y: -1,
			height: -1,
			width: -1
		};
	});

	mainWindow.on('minimize', () => {
		appSettings.position = {
			state: 'minimize',
			x: -1,
			y: -1,
			height: -1,
			width: -1
		};
	});

	mainWindow.on('enter-full-screen', () => {
		appSettings.position = {
			state: 'fullScreen',
			x: -1,
			y: -1,
			height: -1,
			width: -1
		};
	});
};

// #endregion


app.on('ready', () => {
	// load settings
	loadSettings(settingOptions)
		.then((result: ISettings) => {

			// application settings
			appSettings = { ...result };

			app.setName('Electron with Angular');
			buildApplicationMenu();
			createWindow();
		});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

// #region "Receive Channel Events from Frontend"

// Receive the channel event "elan.frontend.ready"
ipcMain.on(AppChannels.CHANNEL_FRONTEND_READY, (ev: any, ...args: any[]) => {
	console.log('>>> ', args);
	if (appSettings && mainWindow) {
		// send the frontend settings
		mainWindow.webContents.send(AppChannels.CHANNEL_BACKEND_SETTING, { ...appSettings.frontend });
	}
});

// Receive the channel event "elan.frontend.setting"
ipcMain.on(AppChannels.CHANNEL_FRONTEND_SETTING, (ev, frontend: any) => {
	if (appSettings) {
		appSettings.frontend = { ...frontend };
	}
});

// #endregion
