const express = require('express')
const UserController = require('../controllers/UserController')
const BlogController = require('../controllers/BlogController')
const middleWare = require('../middleware/Auth')
const router = express.Router()

// UserController
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// BlogController
router.post('/blog', middleWare, BlogController.store)
router.get('/blog', middleWare, BlogController.fetchAll)
router.get('/blog/:id', middleWare, BlogController.fetchOne)
router.put('/blog/:id', middleWare, BlogController.update)
router.delete('/blog/:id', middleWare, BlogController.delete)

module.exports = router