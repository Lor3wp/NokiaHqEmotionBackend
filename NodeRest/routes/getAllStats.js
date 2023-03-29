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
    const count1 = Number(rows1[0].count); // extract count value and convert to number
    const count2 = Number(rows2[0].count); // extract count value and convert to number
    const count3 = Number(rows3[0].count); // extract count value and convert to number
    const count4 = Number(rows4[0].count); // extract count value and convert to number
    const count5 = Number(rows5[0].count); // extract count value and convert to number
    const count6 = Number(rows6[0].count); // extract count value and convert to number
    res
      .status(200)
      .json({ feelings: [count1, count2, count3, count4, count5, count6] }); // send count value as a JSON object
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

module.exports = router;
