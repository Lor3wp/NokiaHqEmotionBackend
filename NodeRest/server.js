const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env-local" });
const cors = require("cors");


const sqlite3 = require('sqlite3').verbose();

// check if it already exists
const db = new sqlite3.Database('../nokiahqemotiontrackersqlite.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS emotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      emotion_id INTEGER NOT NULL,
      sub_emotion_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

module.exports = db;



const PORT = process.env.PORT || "3001";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// middleware


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
// app.get("/", (req, res) => {
//   res.status(200).json({ name: "pavel", doing: "coding" });
// });

const addRouter = require("./routes/addEmotion");
app.use("/add", addRouter);

const emotionsRouter = require("./routes/emotionsRoute");
app.use("/emotions", emotionsRouter);
// start listening

app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`);
});




// tein lokaalin rest api serverin joka yhdistyy lokaliin tietokantaan, lisää ja hakee sieltä tavaraa
// tänään lisään apiin lisää endpointeja sekä lähden luomaan fronttia ja yhdistän sen bäkkiin
