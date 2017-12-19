const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')

let mainWindow

let menuTemplate = [
  {
    label: '选项',
    submenu: [
      {
        label: '关于',
        click: () => {
          openAboutWindow();
        }
      }
    ]
  }
]

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
  // mainWindow.webContents.openDevTools();

  // 设置菜单
  let menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function openAboutWindow() {
  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    width: 400,
    height: 200
  })

  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 取消菜单
  aboutWindow.setMenu(null)
}

// electron初始化完毕后触发函数
app.on('ready', createWindow)

// 当所有窗口被关闭后触发
app.on('window-all-closed',  () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// mac os为dock打开时创建新窗口
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})