const { app, BrowserWindow } = require('electron');
const path = require('path');
require('dotenv').config();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js'),
      contextIsolation: true,
      nodeIntegration: false, // sécurisé
    },
  });

  mainWindow.loadFile('src/Landing_page/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const { ipcMain } = require('electron');

ipcMain.on('navigate-to', (event, page) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.loadFile(`src/${page}.html`);
  }
});
