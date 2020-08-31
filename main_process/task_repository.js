// task_repository.js

class TaskRepository {
  constructor(dao) {
    this.dao = dao
  }

  //khoi tao bang
  createTable() {
    // insert du lieu vao trong bang
    // table: ten bang
    // task: noi dung task
    // date: ngay lam viec
    // process: phan loai task
    // process = 1: doing task
    // process = 2: do later task
    // process = 3: completed task
    const sql = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT,
        date text,
        process INTEGER DEFAULT 1)`
    return this.dao.run(sql)
  }

  // insert du lieu vao trong bang
  // task: noi dung task
  // date: ngay lam viec
  // process: phan loai task
  insert(task, date, process) {
    let sql = `
      INSERT INTO tasks(task, date, process)
      VALUES (?, ?, ?)
    `;
    return this.dao.run(sql, [task, date, process]);
  }

  //update data theo id
  // _task truyen vao la task da duoc chinh sua noi dung
  update(_task) {
    const { id, task, date, process } = _task
    let sql = `UPDATE tasks
              SET task = ?,
                date = ?,
                process = ?
              WHERE id = ?`;
    return this.dao.run(sql, [task, date, process, id])
  }

  // update du lieu theo process
  updateByProcessAndDate(date, from, to) {
    let sql = `
      UPDATE tasks
      SET process = ?
      WHERE process = ? AND date = ?
    `;
    return this.dao.run(sql, [to, from, date])
  }

  // update mot row theo id
  updateByProcessAndID(id, to) {
    let sql = `
      UPDATE tasks
      SET process = ?
      WHERE id = ?
    `;
    return this.dao.run(sql, [to, id])
  }

  // delete data dua theo id
  delete(id) {
    let sql = `DELETE FROM tasks WHERE id = ?`;
    return this.dao.run(sql, [id]);
  }

  // get row by id
  getByID(id) {
    let sql = `
      SELECT *
      FROM tasks
      WHERE id = ?
    `;
    return this.dao.get(sql, [id]);
  }

  // get all row
  getAll() {
    let sql = `
      SELECT *
      FROM tasks
    `;
    return this.dao.all(sql, []);
  }

  // get all task by date
  getAllByDate(date) {
    let sql = `
      SELECT *
      FROM tasks
      WHERE date = ?
    `;
    return this.dao.all(sql, [date]);
  }

  // get all data by process
  getAllByProcess(process) {
    let sql = `
      SELECT *
      FROM tasks
      WHERE process = ?
    `;
    this.dao.all(sql, [process]);
  }
  close() {
    this.dao.close();
  }
}

module.exports = TaskRepository;