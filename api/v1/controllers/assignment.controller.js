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
    else res.status(201).json({ message: 'Assignment created', data })
  })
}

// retrieve one uuid
exports.findOne = (req, res) => {
  Assignment.findOne({ uid: req.params.uid })
    .select('-__v -createdAt -updatedAt -_id')
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: `Not found assignment with uid ${req.params.uid}`,
        })
      else res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving assignment with uid',
      })
    })
}
