const router = require('express').Router()
const userController = require('../controllers/usersController')

router.get('/', userController.findAll)
router.post('/', userController.register)
router.post('/weblogin', userController.webLogin)
router.post('/googleLogin', userController.googleLogin)

module.exports = router