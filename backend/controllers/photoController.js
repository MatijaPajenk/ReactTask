var PhotoModel = require('../models/photoModel.js')

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
            .populate('postedBy')
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    })
                }

                photos = photos.map(function (photo) {
                    photo = photo.toObject()
                    photo.postedOn = new Date(photo.postedOn).toLocaleString()
                    photo.details = false
                    return photo
                })

                //return res.render('photo/list', data);
                return res.status(200).json(photos)
            })
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        const id = req.params.id
        const userId = req.params.userId

        PhotoModel.findByIdAndUpdate(id, { $addToSet: { views: userId } })
            .populate('postedBy')
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    })
                }

                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    })
                }

                photo = photo.toObject()
                photo.postedOn = new Date(photo.postedOn).toLocaleString()
                photo.details = true

                return res.json(photo)
            })
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
            title: req.body.title,
            description: req.body.description,
            path: "/images/" + req.file.filename,
            postedBy: req.session.userId,
            postedOn: new Date(),
            views: [],
            likes: [],
            dislikes: [],
        })

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                })
            }

            return res.status(201).json(photo)
            //return res.redirect('/photos');
        })
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                })
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                })
            }

            photo.title = req.body.title | photo.title
            photo.description = req.body.description | photo.description
            photo.path = req.body.path | photo.path
            photo.postedBy = req.body.postedBy | photo.postedBy
            photo.views = req.body.views | photo.views
            photo.likes = req.body.likes | photo.likes
            photo.dislikes = req.body.dislikes | photo.dislikes

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    })
                }

                return res.json(photo)
            })
        })
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    },

    like: function (req, res) {
        const photoId = req.params.photoId
        const userId = req.params.userId

        PhotoModel.findByIdAndUpdate(photoId, { $addToSet: { likes: userId }, $pull: { dislikes: userId } }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when liking photo',
                    error: err
                })
            }

            return res.status(200).json(photo)
        })
    },

    dislike: function (req, res) {
        const photoId = req.params.photoId
        const userId = req.params.userId

        PhotoModel.findByIdAndUpdate(photoId, { $addToSet: { dislikes: userId }, $pull: { likes: userId } }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when disliking photo',
                    error: err
                })
            }

            return res.status(200).json(photo)
        })
    },

    unlike: function (req, res) {
        const photoId = req.params.photoId
        const userId = req.params.userId

        PhotoModel.findByIdAndUpdate(photoId, { $pull: { likes: userId } }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when unliking photo',
                    error: err
                })
            }

            return res.status(200).json(photo)
        }
        )
    },

    undislike: function (req, res) {
        const photoId = req.params.photoId
        const userId = req.params.userId

        PhotoModel.findByIdAndUpdate(photoId, { $pull: { dislikes: userId } }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when undisliking photo',
                    error: err
                })
            }

            return res.status(200).json(photo)
        }
        )
    },
}
