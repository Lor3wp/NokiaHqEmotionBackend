const express = require("express");
const db = require("../helpers/database");
const router = express.Router();

router.post("/addemotion", async function (req, res) {
  try {
    const { emotion, subEmotion } = req.body;
    const sqlQuery =
      "INSERT INTO emotions (emotion_id, sub_emotion_id) VALUES (?, ?)";
    db.run(sqlQuery, [emotion, subEmotion], function (err) {
      if (err) {
        console.log(err);
        res.status(400).send(err.message);
      } else {
        res.status(200).json({ emotionId: this.lastID.toString() });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
