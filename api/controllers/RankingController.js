const Ranking = require("../models/Ranking")

exports.getHighestValues = (req, res) => {
  Ranking.find({}, (err, ranking) => {
    if (err) res.status(500).send(err)

    res.status(200).json(ranking)
  }).sort({age:-1}).limit(10)
}

exports.createNewRanking = (req, res) => {
  const newRanking = new Ranking(req.body)

  newRanking.save((err, ranking) => {
    if (err) res.status(500).send(err)

    res.status(201).json(ranking)
  })
}