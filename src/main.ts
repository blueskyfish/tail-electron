
import * as path from 'path';
import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions } from 'electron';
import * as minimist from 'minimist';

let mainWindow: BrowserWindow = null;

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

const parsedArgs: minimist.ParsedArgs = minimist(process.argv.slice(2), {
	boolean: ['serve'],
	alias: {
		s: 'serve'
	},
	default: {
		serve: false
	}
});

const createWindow = () => {
	mainWindow = new BrowserWindow({
		height: 480,
		width: 640
	});

	if (parsedArgs.serve) {
		// disable the warnings in the developer mode
		process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']='true';

		// get the frontend via http
		mainWindow.loadURL('http://localhost:5200/');
		mainWindow.webContents.openDevTools({
			mode: 'detach'
		});
		console.log('Start the Develope mode...');
	} else {
		mainWindow.loadFile(path.join(__dirname, '..', 'webapp', 'index.html'));
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};


app.on('ready', () => {
	app.setName('Electron with Angular');
	buildApplicationMenu();
	createWindow();
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

ipcMain.on('elan.frontend.ready', (ev: any, ...args: any[]) => {
	console.log('Frontend: ', args);
});
