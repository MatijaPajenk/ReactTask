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

                photos = photos.map((photo) => {
                    photo = photo.toObject()
                    photo.postedOn = new Date(photo.postedOn).toLocaleString()
                    photo.details = false
                    photo.nsfw = photo.nsfw.length > 1
                    return photo
                })

                //return res.render('photo/list', data);
                return res.status(200).json(photos)
            })
    },

    /**
     * photoController.show()
     */
    show: async function (req, res) {
        const id = req.params.id
        const userId = req.session.userId

        let update = {}
        if (userId) {
            update = { $addToSet: { views: userId } }
        }

        try {
            let photo = await PhotoModel.findByIdAndUpdate(id, update)
                .populate('postedBy')
                .exec()

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                })
            }

            photo = photo.toObject()
            photo.postedOn = new Date(photo.postedOn).toLocaleString()
            photo.details = true
            photo.nsfw = photo.nsfw.length || 0

            return res.json(photo)
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting photo.',
                error: err
            })
        }
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

    like: async function (req, res) {
        const photoId = req.params.id
        const userId = req.session.userId

        try {
            const photo = await PhotoModel.findByIdAndUpdate(photoId,
                {
                    $addToSet: { likes: userId },
                    $pull: { dislikes: userId }
                },
                { new: true }
            )
            return res.status(200).json({ likes: photo.likes, dislikes: photo.dislikes })
        } catch (err) {
            return res.status(500).json({
                message: 'Error when liking photo',
                error: err
            })
        }
    },

    dislike: async function (req, res) {
        const photoId = req.params.id
        const userId = req.session.userId

        try {
            const photo = await PhotoModel.findByIdAndUpdate(photoId, { $addToSet: { dislikes: userId }, $pull: { likes: userId } }, { new: true })
            return res.status(200).json({ likes: photo.likes, dislikes: photo.dislikes })
        } catch (err) {
            return res.status(500).json({
                message: 'Error when liking photo',
                error: err
            })
        }
    },

    unlike: async function (req, res) {
        const photoId = req.params.id
        const userId = req.session.userId


        try {
            const photo = await PhotoModel.findByIdAndUpdate(photoId, { $pull: { likes: userId } }, { new: true })
            return res.status(200).json({ likes: photo.likes, dislikes: photo.dislikes })
        } catch (err) {
            return res.status(500).json({
                message: 'Error when liking photo',
                error: err
            })
        }
    },

    undislike: async function (req, res) {
        const photoId = req.params.id
        const userId = req.session.userId

        try {
            const photo = await PhotoModel.findByIdAndUpdate(photoId, { $pull: { dislikes: userId } }, { new: true })
            return res.status(200).json({ likes: photo.likes, dislikes: photo.dislikes })
        } catch (err) {
            return res.status(500).json({
                message: 'Error when liking photo',
                error: err
            })
        }
    },

    nsfw: async function (req, res) {
        const photoId = req.params.id
        const userId = req.session.userId

        try {
            const photo = await PhotoModel.findByIdAndUpdate(photoId, { $addToSet: { nsfw: userId } }, { new: true })
            return res.status(200).json({ nsfw: photo.nsfw.length })
        } catch (err) {
            return res.status(500).json({
                message: 'Error when marking photo as nsfw',
                error: err
            })
        }
    }
}
