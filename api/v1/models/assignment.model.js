const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

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
    uid: {
      type: String,
      default: () => {
        return uuidv4()
      },
    },
  },
  {
    timestamps: true,
  }
)

const Assignment = mongoose.model('assignment', assignmentSchema)

module.exports = Assignment
