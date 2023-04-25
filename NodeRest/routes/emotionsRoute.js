const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();


router.get("/getday/:year/:month/:day", async function (req, res) {
    try {
        console.log(req.params.year, req.params.month, req.params.day)
        const sqlQuery = "SELECT HOUR(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "sub_emotion_id,\n" +
            "COUNT(*) AS count,\n" +
            "DATE(created_at) AS full_date\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ?\n" +
            "GROUP BY HOUR(created_at), emotion_id, sub_emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.year.toString(), req.params.month.toString(), req.params.day.toString()]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                sub_emotion_id: row.sub_emotion_id.toString(),
                count: row.count.toString(),
                full_date: row.full_date.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getweek/:startdate/:enddate", async function (req, res) {
    try {
        console.log(req.params.startdate, req.params.enddate)

        const sqlQuery = "SELECT DAY(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "sub_emotion_id,\n" +
            "COUNT(*) AS count,\n" +
            "DATE(created_at) AS full_date\n" +
            "FROM emotions\n" +
            "WHERE DATE(created_at) BETWEEN ? AND ?\n" +
            "GROUP BY DAY(created_at), emotion_id, sub_emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.startdate, req.params.enddate]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                sub_emotion_id: row.sub_emotion_id.toString(),
                count: row.count.toString(),
                full_date: row.full_date.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getmonth/:year/:month", async function (req, res) {
    try {
        console.log(req.params.month)

        const sqlQuery = "SELECT DAY(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "sub_emotion_id,\n" +
            "COUNT(*) AS count,\n" +
            "DATE(created_at) AS full_date\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) = ?\n" +
            "AND MONTH(created_at) = ?\n" +
            "GROUP BY DAY(created_at), emotion_id, sub_emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.year, req.params.month]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                sub_emotion_id: row.sub_emotion_id.toString(),
                count: row.count.toString(),
                full_date: row.full_date.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getyear/:year", async function (req, res) {
    try {
        console.log(req.params.year)

        const sqlQuery = "SELECT MONTH(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "sub_emotion_id,\n" +
            "COUNT(*) AS count\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) = ?\n" +
            "GROUP BY MONTH(created_at), emotion_id, sub_emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.year]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                sub_emotion_id: row.sub_emotion_id.toString(),
                count: row.count.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getyears/:startyear/:endyear", async function (req, res) {
    try {
        console.log(req.params.startyear, req.params.endyear)

        const sqlQuery = "SELECT YEAR(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "sub_emotion_id,\n" +
            "COUNT(*) AS count\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) BETWEEN ? AND ?\n" +
            "GROUP BY YEAR(created_at), emotion_id, sub_emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.startyear, req.params.endyear]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                sub_emotion_id: row.sub_emotion_id.toString(),
                count: row.count.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getday/primary/:year/:month/:day", async function (req, res) {
    try {
        console.log(req.params.year, req.params.month, req.params.day)
        const sqlQuery = "SELECT HOUR(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "COUNT(*) AS count,\n" +
            "DATE(created_at) AS full_date\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ?\n" +
            "GROUP BY HOUR(created_at), emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.year.toString(), req.params.month.toString(), req.params.day.toString()]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                count: row.count.toString(),
                full_date: row.full_date.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getweek/primary/:startdate/:enddate", async function (req, res) {
    try {
        console.log(req.params.startdate, req.params.enddate)

        const sqlQuery = "SELECT DAY(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "COUNT(*) AS count,\n" +
            "DATE(created_at) AS full_date\n" +
            "FROM emotions\n" +
            "WHERE DATE(created_at) BETWEEN ? AND ?\n" +
            "GROUP BY DAY(created_at), emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.startdate, req.params.enddate]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                count: row.count.toString(),
                full_date: row.full_date.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getmonth/primary/:year/:month", async function (req, res) {
    try {
        console.log(req.params.month)

        const sqlQuery = "SELECT DAY(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "COUNT(*) AS count,\n" +
            "DATE(created_at) AS full_date\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) = ?\n" +
            "AND MONTH(created_at) = ?\n" +
            "GROUP BY DAY(created_at), emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.year, req.params.month]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                count: row.count.toString(),
                full_date: row.full_date.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getyear/primary/:year", async function (req, res) {
    try {
        console.log(req.params.year)

        const sqlQuery = "SELECT MONTH(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "COUNT(*) AS count\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) = ?\n" +
            "GROUP BY MONTH(created_at), emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.year]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                count: row.count.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/getyears/primary/:startyear/:endyear", async function (req, res) {
    try {
        console.log(req.params.startyear, req.params.endyear)

        const sqlQuery = "SELECT YEAR(created_at) AS created_at,\n" +
            "emotion_id,\n" +
            "COUNT(*) AS count\n" +
            "FROM emotions\n" +
            "WHERE YEAR(created_at) BETWEEN ? AND ?\n" +
            "GROUP BY YEAR(created_at), emotion_id;";
        const rows = await pool.query(sqlQuery, [req.params.startyear, req.params.endyear]);
        console.log(rows)
        const serializedRows = rows.map((row) => {
            return {
                created_at: row.created_at.toString(),
                emotion_id: row.emotion_id.toString(),
                count: row.count.toString(),
            };
        });
        res.status(200).json(serializedRows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/addemotion", async function (req, res) {
    try {
        const { emotion, subEmotion } = req.body;
        console.log(emotion + " " + subEmotion);
        const sqlQuery =
            "INSERT INTO emotions (emotion_id, sub_emotion_id) VALUES (?, ?)";
        const result = await pool.query(sqlQuery, [emotion, subEmotion]);
        console.log(req.body);
        res.status(200).json({ emotionId: result.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

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
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let date = year + "-" + month + "-" + day;
    console.log((date_ob.getTime() / 60) * 1000);
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
