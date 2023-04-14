create DATABASE NokiaHqEmotions;

USE NokiaHqEmotions

CREATE TABLE emotions(
    id INT auto_increment,
    emotion_id INT NOT NULL,
    sub_emotion_id INT NOT NULL,
    created_at DATETIME DEFAULT current_timestamp,
    PRIMARY KEY(id)
);

INSERT INTO emotions (emotion_id, created_at) VALUES ('1', '2023.03.23 14:57');

-- to drop table use 
DROP emotions

-- viimeksi korjasin bäkin subemotioneita varten, sain build toiminnon valmiiksi cicd fronttia varten, valmistelin cicd bäkkiä varten, tein vähäsen unit testejä, 
-- tänään jaan viisauteni cicd suhteen ryhmän kanssa ja katsotaan että kaikki osaavat tehdä sen, opiskelen lisää ja implementoin unit testejä, siivoan ja kommentoin koodia.
-- ei impedimentsejä  

-- viimeksi tein cicd bäkille ryhmän kanssa, tain vähäsen unit testejä sekä tein uita statistiikkanäkymää varten.
-- tänään valmistellen esitelmää sekä osallistun projektiesittelyyn ja tuotetestaukseen, aloitan statistiikkanäkymän koodausta 
-- ei impedimentsejä
