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



