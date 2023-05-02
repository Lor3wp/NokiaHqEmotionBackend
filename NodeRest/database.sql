create DATABASE NokiaHqEmotions;

USE NokiaHqEmotions

CREATE TABLE emotions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emotion_id INTEGER NOT NULL,
    sub_emotion_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO emotions (emotion_id, sub_emotion_id, created_at) VALUES ('1', '2', '2023.03.23 14:57');

-- to drop table use 
DROP emotions



`SELECT strftime('%d', created_at) AS created_at, emotion_id,COUNT(*) AS count,strftime('%Y-%m-%d', created_at) AS full_date FROM emotions WHERE strftime('%Y', created_at) = 2023 AND strftime('%m', created_at) = 04 GROUP BY strftime('%d', created_at), emotion_id`;