const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();

router.get("/getallstats", async function (req, res) {
  try {
    const sqlQuery1 =
      "select count(*) as count from emotions where emotion_id = 1";
    const sqlQuery2 =
      "select count(*) as count from emotions where emotion_id = 2";
    const sqlQuery3 =
      "select count(*) as count from emotions where emotion_id = 3";
    const sqlQuery4 =
      "select count(*) as count from emotions where emotion_id = 4";
    const sqlQuery5 =
      "select count(*) as count from emotions where emotion_id = 5";
    const sqlQuery6 =
      "select count(*) as count from emotions where emotion_id = 6";
    const rows1 = await pool.query(sqlQuery1, req.params.id);
    const rows2 = await pool.query(sqlQuery2, req.params.id);
    const rows3 = await pool.query(sqlQuery3, req.params.id);
    const rows4 = await pool.query(sqlQuery4, req.params.id);
    const rows5 = await pool.query(sqlQuery5, req.params.id);
    const rows6 = await pool.query(sqlQuery6, req.params.id);
    const i1 = Number(rows1[0].count); // extract count value and convert to number
    const i2 = Number(rows2[0].count); // extract count value and convert to number
    const i3 = Number(rows3[0].count); // extract count value and convert to number
    const i4 = Number(rows4[0].count); // extract count value and convert to number
    const i5 = Number(rows5[0].count); // extract count value and convert to number
    const i6 = Number(rows6[0].count); // extract count value and convert to number
    res.status(200).json({ feelings: [i1, i2, i3, i4, i5, i6] }); // send count value as a JSON object
    // res
    //   .status(200)
    //   .json({
    //     happy: count1,
    //     sad: count2,
    //     angry: count3,
    //     fear: count4,
    //     feeling: count5,
    //     feelings: count6,
    //   }); // send count value as a JSON object
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/getemotions", async function (req, res) {
  try {
    const sqlQuery =
      "SELECT emotion_id, COUNT(*) as count FROM emotions GROUP BY emotion_id";
    const rows = await pool.query(sqlQuery);
    const serializedRows = rows.map((row) => {
      return {
        emotion_id: row.emotion_id.toString(),
        count: row.count.toString(),
      };
    });
    res.status(200).json(serializedRows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/getminuteemotions", async function (req, res) {
  try {
    const sqlQuery =
      "SELECT CAST(created_at AS DATE) as date, HOUR(created_at) AS timehour, emotion_id, COUNT(*) as count FROM emotions GROUP BY CAST(created_at AS DATE), HOUR(created_at),  emotion_id;";
    const rows = await pool.query(sqlQuery);
    const serializedRows = rows.map((row) => {
      return {
        date: row.date,
        timehour: row.timehour.toString(),
        emotion_id: row.emotion_id.toString(),
        count: row.count.toString(),
      };
    });
    res.status(200).json(serializedRows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
