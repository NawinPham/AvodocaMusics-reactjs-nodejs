const { app, BrowserWindow } = require('electron');
const path = require('path');
require('dotenv').config();

let win;

app.whenReady().then(() => {
    win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Update preload path if necessary
            contextIsolation: true,
        },
    });

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173'); // Vite dev server
    } else {
        win.loadFile(path.join(__dirname, 'dist/index.html')); // Production build
    }
});
