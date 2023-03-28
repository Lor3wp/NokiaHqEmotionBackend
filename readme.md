kun gitti on kloonattu niin aja kaikki nää tässä järjestyksessä

npm init
npm install express
npm install dotenv

avaa mariadb (v10.11) ja tarkista millä käyttäjällä olet sekä mikä salasana
database.sql tietokannan luontifilu

luo .env-local tiedosto ja iske sinne nämä 

PORT = 3001
DB_HOST = localhost
DB_USER = <tänne tulee sinun tietokannan käyttäjänimi>
DB_PASS = <tänne tulee sinun tietokannan käyttäjän salasana>
DB_NAME = NokiaHqEmotions

ENDPOINTS
localhost:3001/add/addemotion/id 
tässä id on INT joka vastaa tunteen id:tä eli esim (localhost:3001/add/addemotion/2)

localhost:3001/get/getallstats
palauttaa tunteiden määrän

localhost:3001/get/getstatsbyid/id
tässä id on INT joka vastaa tunteen id:tä ja palauttaa näiden tunteiden määrän eli esim (localhost:3000/get/getstatsbyid/2)
