const express = require('express')
const router = express.Router()


const user = require('../model/user')
const upload = require('./upload')


module.exports =
{
    get: async (req, res) => {
        try {

            const result1 = await user.findOne({ username: req.session.username })
            res.render('profile_edit', { user: result1, username: req.session.username })

        }
        catch (e) {
            res.status('404').send('error')
        }
    },
    post: async (req, res) => {

        try {
            await user.updateOne({ username: req.session.username },
                {
                    $set: {
                        dateofbirth: req.body.dateofbirth,
                        bio: req.body.bio,
                        upload: req.file.filename
                    }
                })

            res.redirect("profile/" + req.session.username)
        }
        catch (e) {
            res.status('404').send('error')
        }
    }
}   