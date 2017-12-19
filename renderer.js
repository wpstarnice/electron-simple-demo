// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {shell} = require('electron')
const os = require('os')


// 打开系统资源管理器

const fileManagerBtn = document.getElementById('openfilemanager')

fileManagerBtn.addEventListener('click', (event) => {
	shell.showItemInFolder(os.homedir())
})


// 在浏览器打开外部链接
const exLinksBtn = document.getElementById('openfanzhiyangcom')

exLinksBtn.addEventListener('click', (event) => {
  shell.openExternal('https://fanzhiyang.com')
})

