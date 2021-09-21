const mongoose = require('mongoose')

const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  fileUrl: {
    type: String,
    required: true,
  },
})

const Candidate = mongoose.model('candidate', candidateSchema)

module.exports = Candidate
