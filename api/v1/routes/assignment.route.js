const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignment.controller')

// create
router.get('/:id', assignmentController.findOne)
router.post('/create', assignmentController.create)

// submit
router.post('/submit', assignmentController.submit)

module.exports = router
