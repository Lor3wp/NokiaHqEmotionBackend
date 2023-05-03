const express = require("express");
const db = require("../server");
const router = express.Router();
const net = require("net");

const colors = [
  { r: 0, g: 0, b: 0 }, // filler if there is less led than 2400
  { r: 7, g: 18, b: 23 }, // Happy
  { r: 31, g: 10, b: 10 }, // Angry
  { r: 15, g: 8, b: 19 }, // Scared
  { r: 31, g: 31, b: 6 }, // Exited
  { r: 8, g: 13, b: 22 }, // Sad
  { r: 26, g: 26, b: 26 }, // Neutral
  { r: 0, g: 0, b: 0 }, // filler if there is less led than 2400
];

const numLeds = 2400;
const ledsInUse = 300;
// [x]
router.get("/getday/:year/:month/:day", async function (req, res) {
  try {
    const sqlQuery = `SELECT strftime('%H', created_at) AS created_at, 
       emotion_id, 
       sub_emotion_id, 
       COUNT(*) AS count, 
       date(created_at) AS full_date 
FROM emotions 
WHERE CAST(strftime('%Y', created_at)as INTEGER) = ? 
  AND CAST(strftime('%m', created_at)as INTEGER) = ? 
  AND CAST(strftime('%d', created_at)as INTEGER) = ? 
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
  } catch (err) {
    console.log(err);
  }
});
// [x]

router.get("/getweek/:startdate/:enddate", async function (req, res) {
  try {
    console.log(req.params.startdate, req.params.enddate);

    const sqlQuery = `SELECT strftime('%d', created_at) AS created_at,
        emotion_id,
        sub_emotion_id,
        COUNT(*) AS count,
        DATE(created_at) AS full_date
        FROM emotions
        WHERE DATE(created_at) BETWEEN ? AND ?\n
        GROUP BY strftime('%d', created_at), emotion_id, sub_emotion_id;`;
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
                       WHERE CAST(strftime('%Y', created_at)as INTEGER) = ?
                       AND CAST(strftime('%m', created_at)as INTEGER) = ?
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
  } catch (err) {
    console.log(err);
  }
});

// [x]
router.get("/getyear/:year", async function (req, res) {
  try {
    const param = req.params.year;
    const sqlQuery = `SELECT strftime('%m', created_at) AS created_at,
            emotion_id,
            sub_emotion_id,
            COUNT(*) AS count
            FROM emotions
            WHERE CAST(strftime('%Y', created_at)as INTEGER) = ?
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
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getyears/:startyear/:endyear", async function (req, res) {
  try {
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
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getday/primary/:year/:month/:day", async function (req, res) {
  try {
    const sqlQuery =
      "SELECT strftime('%H', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count,\n" +
      "DATE(created_at) AS full_date\n" +
      "FROM emotions\n" +
      "WHERE CAST(strftime('%Y', created_at)as INTEGER) = ? AND CAST(strftime('%M', created_at)as INTEGER) = ? AND CAST(strftime('%d', created_at)as INTEGER) = ?\n" +
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
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getweek/primary/:startdate/:enddate", async function (req, res) {
  try {
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
  } catch (err) {
    console.log(err);
  }
});

router.get("/getmonth/primary/:year/:month", async function (req, res) {
  try {
    const month = req.params.month;
    const year = req.params.year;
    const sql = `SELECT strftime('%d', created_at) AS created_at,
                       emotion_id,
                       COUNT(*) AS count,
                       strftime('%Y-%m-%d', created_at) AS full_date
                       FROM emotions
                       WHERE CAST(strftime('%Y', created_at)as INTEGER) = ?
                       AND CAST(strftime('%m', created_at)as INTEGER) = ?
                       GROUP BY strftime('%d', created_at), emotion_id`;
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
  } catch (err) {
    console.log(err);
  }
});

// [x]
router.get("/getyear/primary/:year", async function (req, res) {
  try {
    const sqlQuery =
      "SELECT strftime('%M', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count\n" +
      "FROM emotions\n" +
      "WHERE CAST(strftime('%Y', created_at)as INTEGER) = ?\n" +
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
  } catch (err) {
    console.log(err);
  }
});
// [x]
router.get("/getyears/primary/:startyear/:endyear", async function (req, res) {
  try {
    const sqlQuery =
      "SELECT strftime('%Y', created_at) AS created_at,\n" +
      "emotion_id,\n" +
      "COUNT(*) AS count\n" +
      "FROM emotions\n" +
      "WHERE CAST(strftime('%Y', created_at)as INTEGER) BETWEEN ? AND ?\n" +
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
  } catch (err) {
    console.log(err);
  }
});
const tasker = async () => {
  const today = new Date();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  try {
    const sqlQuery = `SELECT emotion_id, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM emotions WHERE CAST(strftime('%Y', created_at) AS INTEGER) = ? AND CAST(strftime('%m', created_at) AS INTEGER) = ?) AS percentage
FROM emotions
WHERE CAST(strftime('%Y', created_at) AS INTEGER) = ? AND CAST(strftime('%m', created_at) AS INTEGER) = ?
GROUP BY emotion_id;
`;
    const rows = await db.all(
      sqlQuery,
      [year, month, year, month],
      (err, rows) => {
        if (err) {
          console.error(err);
        } else {
          console.log(rows);
          let full = 0;
          const percentages = [0];
          rows.map((emotion) => {
            console.log(emotion.percentage);
            if (emotion.emotion_id != 6) {
              percentages[emotion.emotion_id] =
                Math.floor(emotion.percentage * 100) / 100;
              full += Math.floor(emotion.percentage * 100) / 100;
            }
          });
          percentages[6] = Math.round((100 - full) * 100) / 100;
          for (let i in percentages) {
            percentages[i] = percentages[i] * 0.125;
          }
          percentages[0] = 12.5;
          percentages.push(75);
          console.log(full);
          console.log(percentages);
          const buffer = Buffer.alloc(2 + numLeds * 2 + 1);

          let bufferPos = buffer.writeUInt16BE(0xffff, 0);

          for (let i = 0; i < percentages.length; i++) {
            const numColorLeds = Math.floor((percentages[i] * numLeds) / 100);
            const color = colors[i];
            for (let j = 0; j < numColorLeds; j++) {
              const value =
                ((color.r & 31) << 10) + ((color.g & 31) << 5) + (color.b & 31);
              bufferPos = buffer.writeUInt16BE(value, bufferPos);
            }
          }

          buffer.writeUInt8(0x80, bufferPos);
          console.log(buffer);

          client = new net.Socket();
          client.connect(3002, "localhost");
          client.write(buffer);
          client.end();

          return rows;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
// [x];

const taskerTablet = async (rgb) => {
  red = rgb.r;
  green = rgb.g;
  blue = rgb.b;

  buffer = new Buffer.alloc(2 + 2400 * 2 + 1);
  let bufpos = buffer.writeUInt16BE(0xffff, 0);
  for (let led = 0; led < 2400; led++) {
    bufpos = buffer.writeUint16BE(
      ((red & 31) << 10) + ((green & 31) << 5) + (blue & 31),
      bufpos
    );
  }
  buffer.writeUint8(0x80, bufpos);
  console.log(buffer);
  client = new net.Socket();
  client.connect(3002, "localhost");
  client.write(buffer);
  client.end();
  return true;
};
router.post("/addemotion", async function (req, res) {
  try {
    const { emotion, subEmotion } = req.body;
    const sqlQuery =
      "INSERT INTO emotions (emotion_id, sub_emotion_id) VALUES (?, ?)";
    const result = await db.run(sqlQuery, [emotion, subEmotion]);
    res.status(200).json({ emotionId: result.insertID });
    // taskerTablet(colors[emotion - 1]);
    await tasker();
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/addtabletemotion", async function (req, res) {
  // TODO check that it really is tablet or do better code for tabletcheck
  try {
    const { emotion, subEmotion } = req.body;
    const sqlQuery =
      "INSERT INTO emotions (emotion_id, sub_emotion_id) VALUES (?, ?)";
    const result = await db.run(sqlQuery, [emotion, subEmotion]);
    await taskerTablet(colors[emotion]);
    console.log(color[emotion]);
    await delay(2000);
    console.log("tasker");
    await tasker();
    // await tasker();
    res.status(200).json({ emotionId: result.insertID });
    // TODO timer for 2 seconds, tasker() takes 2 seconds to be done
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// [x]
router.get("/getallemotions", async function (req, res) {
  try {
    const sqlQuery = "SELECT COUNT(*) AS count FROM emotions";
    const rows = await db.all(sqlQuery, (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// [x]
router.get("/gettodayemotions", async function (req, res) {
  let date_ob = new Date();
  let day = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  let date = year + "-" + month + "-" + day;
  try {
    const sqlQuery = `SELECT count(*) as count from emotions e where date(e.created_at) = ?`;

    const rows = await db.all(sqlQuery, [date], (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json(rows);
      }
    });
    // console.log(rows); // add this line to see what the count value is
    // const count = Number(rows[0].count); // extract count value and convert to number
    // res.status(200).json({ count: count }); // send count value as a JSON object
  } catch (error) {
    console.log(error); // add this line to see what error message is being returned
    res.status(400).json({ error: error.message }); // send error message as a JSON object
  }
});

module.exports = router;
