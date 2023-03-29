const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();

router.post("/addemotion", async function (req, res) {
  try {
    const { emotion } = req.body;
    const sqlQuery = "INSERT INTO emotions (emotion_id) VALUES (?)";
    const result = await pool.query(sqlQuery, [emotion]);
    console.log(req.body);
    res.status(200).json({ emotionId: result.insertId.toString() });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
