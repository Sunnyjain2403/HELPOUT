const express = require('express')
const router = express.Router()


const tweet = require('../model/tweet')
const user = require('../model/user')
const comment = require('../model/comment')


const { genSalt, hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { check } = require('../jwt')




module.exports =
    async (req, res) => {
        try {

            const x = await user.findOne({ $and: [{ username: req.body.user }, { followers: req.session.username }] })
            if (!x) {
                await user.updateOne({ username: req.body.user }, { $push: { followers: req.session.username } })
                await user.updateOne({ username: req.session.username }, { $push: { follow: req.body.user } })
            }
            else {
                await user.updateOne({ username: req.body.user }, { $pull: { followers: req.session.username } })
                await user.updateOne({ username: req.session.username }, { $pull: { follow: req.body.user } })
            }

        }

        catch (e) {
            console.log('error')
        }
    }
