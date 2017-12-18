const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

  // 创建窗口
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // 加载页面文件
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 启用开发者工具。
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// electron初始化完毕后触发函数
app.on('ready', createWindow)

// 当所有窗口被关闭后触发
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// mac os为dock打开时创建新窗口
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})