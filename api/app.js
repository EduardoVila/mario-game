require("./config/db");

const express = require("express")
const bodyParser = require("body-parser")
const rankingController = require("./controllers/RankingController")
const app = express();
const port = process.env.PORT || 3301

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app
  .route("/ranking")
  .get(rankingController.getAll)
  .post(rankingController.createNewRanking)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})