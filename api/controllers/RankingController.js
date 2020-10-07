const Ranking = require("../models/Ranking")

exports.getHighestValues = (req, res) => {
  Ranking.find({}, (err, task) => {
    if (err) res.status(500).send(err)

    res.status(200).json(task)
  }).sort({age:-1}).limit(10)
}

exports.createNewRanking = (req, res) => {
  const newRanking = new Ranking(req.body)

  newRanking.save((err, task) => {
    if (err) res.status(500).send(err)

    res.status(201).json(task)
  })
}