const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RankingSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Ranking", RankingSchema)