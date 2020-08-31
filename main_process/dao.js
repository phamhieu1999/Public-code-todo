// dao.js
// Data Access Object
const sqlite3 = require('sqlite3').verbose()

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.log('Could not connect to database' + err)
      }
    })
  }

  //run query
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) {
          console.log('Error running sql ' + sql)
          reject(err)
        } else {
          resolve("Done")
        }
      })
    })
  }

  // get the first row data 
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  // get all row data
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
  close() {
    this.db.close();
  }
}

module.exports = AppDAO