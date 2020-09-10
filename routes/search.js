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
            const searchstring = req.body.searchstring

            const result1 = await user.find({ $and: [{ username: new RegExp(searchstring, "i") }, { followers: req.session.username }, { username: { $ne: req.session.username } }] })
            const result2 = await user.find({ $and: [{ username: new RegExp(searchstring, "i") }, { followers: { $ne: req.session.username } }, { username: { $ne: req.session.username } }] })

            res.send({ result1, result2 })
        }
        catch (e) {
            res.send('error')

        }
    }