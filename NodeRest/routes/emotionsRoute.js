const express = require("express");
const db = require("../server");
const router = express.Router();

// [x]
router.get("/getday/:year/:month/:day", async function (req, res) {
  try {
    console.log(req.params.year, req.params.month, req.params.day);
    const sqlQuery = `SELECT strftime('%H', created_at) AS created_at, 
       emotion_id, 
       sub_emotion_id, 
       COUNT(*) AS count, 
       date(created_at) AS full_date 
FROM emotions 
WHERE strftime('%Y', created_at) = ? 
  AND strftime('%m', created_at) = ? 
  AND strftime('%d', created_at) = ? 
GROUP BY strftime('%H', created_at), emotion_id, sub_emotion_id;`;
    const params = [req.params.year, req.params.month, req.params.day];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getyear/:year", async function (req, res) {
  try {
    const year = req.params.year;
    const sqlQuery =
      "SELECT strftime('%m', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "sub_emotion_id,\n" +
      "COUNT(*) AS count\n" +
      "FROM emotions\n" +
      "WHERE strftime('%Y', created_at) = ?\n" +
      "GROUP BY strftime('%m', created_at), emotion_id, sub_emotion_id;";
    const params = [year];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});

// [x]
router.get("/getmonth/:year/:month", async function (req, res) {
  try {
    const month = req.params.month;
    const year = req.params.year;
    const sql = `SELECT strftime('%d', created_at) AS created_at,
                       emotion_id,
                       sub_emotion_id,
                       COUNT(*) AS count,
                       strftime('%Y-%m-%d', created_at) AS full_date
                       FROM emotions
                       WHERE strftime('%Y', created_at) = ?
                       AND strftime('%m', created_at) = ?
                       GROUP BY strftime('%d', created_at), emotion_id, sub_emotion_id`;
    const params = [year, month];

    const rows = await db.all(sql, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});

// [x]
router.get("/getyear/:year", async function (req, res) {
  try {
    console.log(req.params.year);
    const param = req.params.year;
    const sqlQuery = `SELECT strftime('%m', created_at) AS created_at,
            emotion_id,
            sub_emotion_id,
            COUNT(*) AS count
            FROM emotions
            WHERE strftime('%Y', created_at) = ?
            GROUP BY strftime('%m', created_at), emotion_id, sub_emotion_id`;

    const params = [req.params.year];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getyears/:startyear/:endyear", async function (req, res) {
  try {
    console.log(req.params.startyear, req.params.endyear);

    const sqlQuery =
      "SELECT strftime('%Y', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "sub_emotion_id,\n" +
      "COUNT(*) AS count\n" +
      "FROM emotions\n" +
      "WHERE CAST(strftime('%Y', created_at) as INTEGER) BETWEEN ? AND ?\n" +
      "GROUP BY strftime('%Y', created_at), emotion_id, sub_emotion_id;";
    const params = [req.params.startyear, req.params.endyear];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getday/primary/:year/:month/:day", async function (req, res) {
  try {
    console.log(req.params.year, req.params.month, req.params.day);
    const sqlQuery =
      "SELECT strftime('%H', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count,\n" +
      "DATE(created_at) AS full_date\n" +
      "FROM emotions\n" +
      "WHERE strftime('%Y', created_at) = ? AND strftime('%M', created_at) = ? AND strftime('%d', created_at) = ?\n" +
      "GROUP BY strftime('%H', created_at), emotion_id;";
    const params = [req.params.year, req.params.month, req.params.day];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getweek/primary/:startdate/:enddate", async function (req, res) {
  try {
    console.log(req.params.startdate, req.params.enddate);

    const sqlQuery =
      "SELECT strftime('%d', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count,\n" +
      "DATE(created_at) AS full_date\n" +
      "FROM emotions\n" +
      "WHERE DATE(created_at) BETWEEN ? AND ?\n" +
      "GROUP BY strftime('%d', created_at), emotion_id;";
    const params = [req.params.startdate, req.params.enddate];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});

// NEXT
// [ ]
router.get("/getmonth/primary/:year/:month", async function (req, res) {
  try {
    console.log(req.params.month);
    console.dir(db);
    const sqlQuery =
      "SELECT strftime('%d', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count,\n" +
      "DATE(created_at) AS full_date\n" +
      "FROM emotions\n" +
      "WHERE strftime('%Y', created_at) = ?\n" +
      "AND strftime('%m', created_at) = ?\n" +
      "GROUP BY strftime('%d', created_at), emotion_id;";
    const params = [req.params.month];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});
// [ ]
router.get("/getyear/primary/:year", async function (req, res) {
  try {
    console.log(req.params.year);

    const sqlQuery =
      "SELECT strftime('%M', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count\n" +
      "FROM emotions\n" +
      "WHERE strftime('%Y', created_at) = ?\n" +
      "GROUP BY strftime('%M', created_at), emotion_id;";
    const params = [req.params.year];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});
// [ ]
router.get("/getyears/primary/:startyear/:endyear", async function (req, res) {
  try {
    console.log(req.params.startyear, req.params.endyear);

    const sqlQuery =
      "SELECT strftime('%Y', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count\n" +
      "FROM emotions\n" +
      "WHERE strftime('%Y', created_at) BETWEEN ? AND ?\n" +
      "GROUP BY strftime('%Y', created_at), emotion_id;";
    const params = [req.params.startyear, req.params.endyear];

    const rows = await db.all(sqlQuery, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    const serializedRows = await JSON.stringify(rows);
    console.log(`serialisoidut rivit ${serializedRows}`);
  } catch (err) {
    console.log(err);
  }
});
// [ ]
router.post("/addemotion", async function (req, res) {
  try {
    const { emotion, subEmotion } = req.body;
    console.log(emotion + " " + subEmotion);
    const sqlQuery =
      "INSERT INTO emotions (emotion_id, sub_emotion_id) VALUES (?, ?)";
    const result = await db.run(sqlQuery, [emotion, subEmotion]);
    console.log(req.body);
    res.status(200).json({ emotionId: result.lastID.toString() });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// [ ]
router.get("/getallemotions", async function (req, res) {
  try {
    const sqlQuery = "SELECT COUNT(*) AS count FROM emotions";
    const rows = await db.all(sqlQuery);
    console.log(rows); // add this line to see what the query is returning
    const count = Number(rows[0].count); // extract count value and convert to number
    console.log(count); // add this line to see what the count value is
    res.status(200).json({ count: count }); // send count value as a JSON object
  } catch (error) {
    console.log(error); // add this line to see what error message is being returned
    res.status(400).json({ error: error.message }); // send error message as a JSON object
  }
});

// [ ]
router.get("/gettodayemotions", async function (req, res) {
  let date_ob = new Date();
  let day = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  let date = year + "-" + month + "-" + day;
  console.log((date_ob.getTime() / 60) * 1000);
  try {
    const sqlQuery = `SELECT count(*) as count from emotions e where date(e.created_at) = ?`;
    const rows = await db.all(sqlQuery, [date]);
    console.log(rows); // add this line to see what the count value is
    const count = Number(rows[0].count); // extract count value and convert to number
    res.status(200).json({ count: count }); // send count value as a JSON object
  } catch (error) {
    console.log(error); // add this line to see what error message is being returned
    res.status(400).json({ error: error.message }); // send error message as a JSON object
  }
});

module.exports = router;
