const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Assignment = mongoose.model('assignment', assignmentSchema)

module.exports = Assignment
