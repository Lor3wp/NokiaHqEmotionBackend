const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env-local" });
const cors = require("cors");

const PORT = process.env.PORT || "3001";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// middleware


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
// app.get("/", (req, res) => {
//   res.status(200).json({ name: "pavel", doing: "coding" });
// });

const addRouter = require("./routes/addEmotion");
app.use("/add", addRouter);
const emotionsRouter = require("./routes/emotionsRoute");
app.use("/emotions", emotionsRouter);
// start listening

app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`);
});

// tein lokaalin rest api serverin joka yhdistyy lokaliin tietokantaan, lisää ja hakee sieltä tavaraa
// tänään lisään apiin lisää endpointeja sekä lähden luomaan fronttia ja yhdistän sen bäkkiin
