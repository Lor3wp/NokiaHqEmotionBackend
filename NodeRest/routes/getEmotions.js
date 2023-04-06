const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();



router.get("/allemotions", async function (req, res) {
  try {
    const sqlQuery = "SELECT * FROM emotions";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/getstatsbyid/:id", async function (req, res) {
  try {
    const sqlQuery =
      "select count(*) as count from emotions where emotion_id = ?";
    const rows = await pool.query(sqlQuery, req.params.id);
    console.log(rows);
    const count = Number(rows[0].count); // extract count value and convert to number
    res.status(200).json({ count: count }); // send count value as a JSON object
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/getallstats", async function (req, res) {
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

module.exports = router;


// frontend yhdistettyy apiin, tiedon lisäys ja haku onnistuu
// tänään teen ci tehtävää ja mietin lediseinän kuvan luontia autan saamaan lokaali b'kin muiden koneille

