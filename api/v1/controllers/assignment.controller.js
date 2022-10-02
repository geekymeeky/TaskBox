const Assignment = require('../models/assignment.model')

// create
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty',
    })
  }

  // create assignment
  const assignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
    fileUrl: req.body.fileUrl,
    dueDate: req.body.dueDate,
    points: req.body.points,
  })

  // save assignment in db
  Assignment.create(assignment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the assignment',
      })
    else res.status(201).send(data)
  })
}

// retrieve one uuid
exports.findOne = (req, res) => {
  Assignment.findOne({ uid: req.params.uid }, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found assignment with uid ${req.params.uid}`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving assignment with uid ' + req.params.uid,
        })
      }
    } else res.send(data)
  })
}
