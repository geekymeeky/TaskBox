require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Candidate = require('./api/v1/models/candidate')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', async (req, res) => {
  try {
    const doc = await Candidate.find({}).lean().exec()
    return res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(404)
  }
})

app.use('/api/v1', require('./api/v1/routes/assignment.route'))

app.post('/add', async (req, res) => {
  try {
    const doc = await Candidate.create({ ...req.body })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const connect = async () => {
  return await mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected')
    })
    .catch((err) => {
      console.log(err)
    })
}

connect().then(
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
)

module.exports = connect
