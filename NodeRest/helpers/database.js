// const sqlite3 = require('sqlite3').verbose();

// // check if it already exists
// const db = new sqlite3.Database('../nokiahqemotiontrackersqlite.db', (err) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log('Connected to the database.');
//   }
// });

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS emotions (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       emotion_id INTEGER NOT NULL,
//       sub_emotion_id INTEGER NOT NULL,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     );
//   `);
// });

// module.exports = db;