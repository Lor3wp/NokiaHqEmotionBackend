create DATABASE NokiaHqEmotions;

USE NokiaHqEmotions

CREATE TABLE emotions(
    id INT auto_increment,
    emotion_id INT NOT NULL,
    sub_emotion_id INT NOT NULL,
    created_at DATETIME DEFAULT current_timestamp,
    PRIMARY KEY(id)
);

INSERT INTO emotions (emotion_id, sub_emotion_id, created_at) VALUES ('1', '2', '2023.03.23 14:57');

-- to drop table use 
DROP emotions

