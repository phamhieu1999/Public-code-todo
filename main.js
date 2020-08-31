const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")
const task = require('./main_process/task.js')
let win1, win2;

//main window
function createWindow() {
  win1 = new BrowserWindow({
    width: 500,
    height: 650,
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "./main_process/preload/preload.js")
    }
  });
  // win.loadFile(path.join(__dirname, './views/main_window/html/index.html'));
  win1.loadFile(path.join(__dirname, './views/main_window/html/index.html'));
  win1.on("closed", () => {
    win1 = null;
  })
  win1.setMenu(null);
  win1.webContents.openDevTools();
}

// send mail window
function createWindow2() {
  win2 = new BrowserWindow({
    parent: win1,
    width: 500,
    height: 650,
    center: true,
    resizable: false,
    modal: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "./main_process/preload/preload.js")
    }
  });
  // win.loadFile(path.join(__dirname, './views/main_window/html/index.html'));
  win2.loadFile(path.join(__dirname, './views/mail_window/html/index.html'));
  win2.on("closed", () => {
    win2 = null;
  })
  win2.setMenu(null);
  win2.webContents.openDevTools();
}
ipcMain.handle("set-g-id", async (e, a) => {
  const result = await task.getAllTask();
  return result;
})

ipcMain.on("@add-task", (e, msg) => {
  task.addTask(msg.task, msg.date, msg.process)
    .then((res) => {
      console.log(res);
    })
})

ipcMain.on("remove-task", (e, msg) => {
  task.removeTask(msg.id)
    .then((res) => {
      console.log(res);
    })
})

ipcMain.on("task-swap", (e, msg) => {
  task.taskSwap(msg.id, msg.to)
    .then((res) => {
      console.log(res);
    })
})
ipcMain.on("popup-mail-window", (e, msg) => {
  createWindow2();
})

ipcMain.on("get-mail-content", (e, args) => {
  e.returnValue = require('./main_process/mail.js').getContent(args.tasks);
})
ipcMain.once("@request-send-report", (e, option) => {
  require('./main_process/mail.js').sendMail(option)
  win2.close();
})
ipcMain.handle("reset-progress", async (e, args) => {
  const result = await task.resetProgress(args.date, args.from1, args.from2, args.to);
  console.log(result.status);
  return result.res;
})

ipcMain.handle("get-data-by-date", async (e, a) => {
  const result = await task.getDataByDate(a.date);
  return result;
})


app.whenReady().then(createWindow).then(() => {
  require("./main_process/task.js").createTable();
})