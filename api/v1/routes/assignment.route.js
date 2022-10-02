const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignment.controller')

// create
router.get('/:uid', assignmentController.findOne)
router.post('/create', assignmentController.create)

module.exports = router
