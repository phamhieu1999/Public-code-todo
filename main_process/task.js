const TaskRepository = require("./task_repository.js")
const AppDAO = require('./dao.js')
const path = require("path")
// const { ipcMain, dialog } = require('electron')
// const dbFilePath = 'a.db';


module.exports = {
  createTable: () => {
    const dao = new AppDAO(path.join(__dirname, "../todo_task.db"));
    const taskRep = new TaskRepository(dao);
    taskRep.createTable().then(() => {
      taskRep.close();
      console.log("create table tasks successfully")
    }).catch((err) => {
      taskRep.close();
      console.log("create table tasks error");
    })
  },
  getAllTask: () => {
    const dao = new AppDAO(path.join(__dirname, "../todo_task.db"));
    const taskRep = new TaskRepository(dao);
    return taskRep.getAll().then((tasks) => {
      taskRep.close();
      return tasks;
    }).catch((err) => {
      taskRep.close();
      console.log(err);
      return "Get all task error";
    })
  },
  addTask: (task, date, process) => {
    const dao = new AppDAO(path.join(__dirname, "../todo_task.db"));
    const taskRep = new TaskRepository(dao);
    return taskRep.insert(task, date, process).then(() => {
      taskRep.close();
      return "Insert successful";
    }).catch((err) => {
      taskRep.close();
      console.log(err);
      return "Insert error";
    })
  },
  removeTask: (id) => {
    const dao = new AppDAO(path.join(__dirname, "../todo_task.db"));
    const taskRep = new TaskRepository(dao);
    return taskRep.delete(id).then(() => {
      taskRep.close();
      return "Delete successfully";
    }).catch((err) => {
      taskRep.close();
      console.log(err);
      return "Error when delete record with id = " + id;
    })
  },
  taskSwap: (id, to) => {
    const dao = new AppDAO(path.join(__dirname, "../todo_task.db"));
    const taskRep = new TaskRepository(dao);
    return taskRep.updateByProcessAndID(id, to).then(() => {
      taskRep.close();
      return "Swap successfully";
    }).catch((err) => {
      taskRep.close();
      console.log(err);
      return "Error when swap";
    })
  },
  resetProgress: (date, from1, from2, to) => {
    const dao = new AppDAO(path.join(__dirname, "../todo_task.db"));
    const taskRep = new TaskRepository(dao);
    return taskRep.updateByProcessAndDate(date, from1, to)
      .then(() => {
        return taskRep.updateByProcessAndDate(date, from2, to);
      })
      .then(() => {
        return taskRep.getAllByDate(date);
      })
      .then((tasks) => {
        taskRep.close();
        return {
          status: "Reset successfully",
          res: tasks
        };
      }).catch((err) => {
        taskRep.close();
        console.log(err);
        return "Error when reset";
      })
  },
  getDataByDate: (date) => {
    const dao = new AppDAO(path.join(__dirname, "../todo_task.db"));
    const taskRep = new TaskRepository(dao);
    return taskRep.getAllByDate(date).then((tasks) => {
      taskRep.close();
      return tasks
    }).catch((err) => {
      taskRep.close();
      console.log(err);
      return "Error when get data";
    })
  }
}