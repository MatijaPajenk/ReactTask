var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController.js')

var multer = require('multer')
var upload = multer({ dest: 'public/images/' })

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next()
    } else {
        var err = new Error("You must be logged in to view this page")
        err.status = 401
        return next(err)
    }
}

router.get('/', userController.list)
//router.get('/register', userController.showRegister);
//router.get('/login', userController.showLogin);
router.get('/profile', userController.profile)
router.get('/logout', userController.logout)
router.get('/:id', userController.show)

router.post('/', userController.create)
router.post('/login', userController.login)

router.put('/changeAvatar', requiresLogin, upload.single('avatar'), userController.changeAvatar)
router.put('/:id', userController.update)

router.delete('/:id', userController.remove)

module.exports = router
