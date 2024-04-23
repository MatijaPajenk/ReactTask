var UserModel = require('../models/userModel.js')
var PhotoModel = require('../models/photoModel.js')
var CommentModel = require('../models/commentModel.js')

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                })
            }

            return res.json(users)
        })
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                })
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                })
            }

            return res.json(user)
        })
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: null
        })

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                })
            }

            return res.status(201).json(user)
            //return res.redirect('/users/login');
        })
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                })
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                })
            }

            user.username = req.body.username ? req.body.username : user.username
            user.password = req.body.password ? req.body.password : user.password
            user.email = req.body.email ? req.body.email : user.email

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    })
                }

                return res.json(user)
            })
        })
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    },

    showRegister: function (req, res) {
        res.render('user/register')
    },

    showLogin: function (req, res) {
        res.render('user/login')
    },

    login: function (req, res, next) {
        UserModel.authenticate(req.body.username, req.body.password, function (err, user) {
            if (err || !user) {
                var err = new Error('Wrong username or paassword')
                err.status = 401
                return next(err)
            }
            req.session.userId = user._id
            //res.redirect('/users/profile');
            return res.json(user)
        })
    },

    profile: async function (req, res, next) {
        try {
            var user = await UserModel.findById(req.session.userId).exec()

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                })
            }

            const photos = await PhotoModel.find({ postedBy: req.session.userId }).exec()

            const likes = photos.reduce((acc, photo) => acc + photo.likes.length, 0)
            const dislikes = photos.reduce((acc, photo) => acc + photo.dislikes.length, 0)

            const comments = await CommentModel.find({ postedBy: req.session.userId }).exec()

            user = user.toObject()
            user.photoCount = photos.length || 0
            user.commentCount = comments.length || 0
            user.likes = likes
            user.dislikes = dislikes

            return res.json(user)
        } catch (error) {
            return res.status(500).json({
                message: 'Error when getting user',
                error: error
            })
        }
    },


    logout: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err)
                } else {
                    //return res.redirect('/');
                    return res.status(201).json({})
                }
            })
        }
    },

    changeAvatar: function (req, res) {
        const userId = req.session.userId
        const path = '/images/' + req.file.filename

        console.log('userId', userId)
        console.log('path', path)


        UserModel.findByIdAndUpdate(userId, { avatar: path }, { new: true }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating user',
                    error: err
                })
            }

            return res.json(user)
        })
    },

    csrfToken: function (req, res) {

        res.json({ csrfToken: req.csrfToken() })
    }
}
