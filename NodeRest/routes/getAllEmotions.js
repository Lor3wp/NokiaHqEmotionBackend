const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();

router.get("/getallemotions", async function (req, res) {
  try {
    const sqlQuery = "select count(*) as count from emotions";
    const rows = await pool.query(sqlQuery);
    console.log(rows); // add this line to see what the query is returning
    const count = Number(rows[0].count); // extract count value and convert to number
    console.log(count); // add this line to see what the count value is
    res.status(200).json({ count: count }); // send count value as a JSON object
  } catch (error) {
    console.log(error); // add this line to see what error message is being returned
    res.status(400).json({ error: error.message }); // send error message as a JSON object
  }
});


router.get("/gettodayemotions", async function (req, res) {
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();

  var date = year + "-" + month + "-" + day;
  console.log(date);

  try {
    const sqlQuery = `SELECT count(*) as count from emotions e where cast(e.created_at as date) = '${date}'`;
    const rows = await pool.query(sqlQuery);
    console.log(rows); // add this line to see what the count value is
    const count = Number(rows[0].count); // extract count value and convert to number
    res.status(200).json({ count: count }); // send count value as a JSON object
  } catch (error) {
    console.log(error); // add this line to see what error message is being returned
    res.status(400).json({ error: error.message }); // send error message as a JSON object
  }
});
module.exports = router;
