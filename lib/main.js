"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const electron_1 = require("electron");
const minimist = require("minimist");
let mainWindow = null;
const buildApplicationMenu = () => {
    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                    click: () => {
                        electron_1.app.quit();
                    }
                }
            ]
        }
    ];
    if (process.platform === 'darwin') {
        menuTemplate.unshift({
            label: electron_1.app.getName(),
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
    const menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
};
const parsedArgs = minimist(process.argv.slice(2), {
    boolean: ['serve'],
    alias: {
        s: 'serve'
    },
    default: {
        serve: false
    }
});
const createWindow = () => {
    mainWindow = new electron_1.BrowserWindow({
        height: 480,
        width: 640
    });
    if (parsedArgs.serve) {
        // disable the warnings in the developer mode
        process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
        // get the frontend via http
        mainWindow.loadURL('http://localhost:5200/');
        mainWindow.webContents.openDevTools({
            mode: 'detach'
        });
        console.log('Start the Develope mode...');
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '..', 'webapp', 'index.html'));
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};
electron_1.app.on('ready', () => {
    electron_1.app.setName('Electron with Angular');
    buildApplicationMenu();
    createWindow();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
electron_1.ipcMain.on('elan.frontend.ready', (ev, ...args) => {
    console.log('Frontend: ', args);
});
//# sourceMappingURL=main.js.map