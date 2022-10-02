const mongoose = require('mongoose')
const Assignment = require('./assignment.model')

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true,
      validate: {
        validator: (v) => Assignment.findOne({ uid: v }),
        message: (props) => `${props.value} is not a valid assignment uid`,
      },
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
      validate: {
        validator: (v) => !/<\/?[a-z][\s\S]*>/i.test(v),
        message: (props) => `${props.value} is not a valid name!`,
      },
    },
    phone: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
      maxlength: 100,
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String,
      validate: {
        validator: (v) =>
          /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/(.*?)\/o\/(.*?)\?alt=media&token=(.*?)$/.test(
            v
          ),

        message: (props) => `${props.value} is not a valid url!`,
      },
    },
    submissionId: {
      type: String,
      default: () => uuidv4(),
    },
  },
  {
    timestamps: true,
  }
)

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = Submission
