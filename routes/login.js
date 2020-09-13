const express = require('express')
const router = express.Router()


const tweet = require('../model/tweet')
const user = require('../model/user')
//const comment=require('../model/reply')


const { genSalt, hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { check } = require('../jwt')
const { validationResult } = require('express-validator')
const { matchedData, sanitizeBody } = require('express-validator/filter');







module.exports = {
    post: async (req, res) => {
        try {

            const findUser = await user.findOne({ username: req.body.username })

            const username = req.body.username
            if (!findUser) {

                res.render('login', {
                    errors: { email: 'username not Exist!!' },
                    user: { username: username }
                })
            }


            const confirmPassword = await compare(req.body.password, findUser.password)
            if (confirmPassword) {
                const token = await sign(req.body, 'qwertyuiop')
                req.session.token = token
                req.session.username = findUser.username
                res.redirect('tweets')
                return
            }

            else {

                res.render('login', {
                    errors: { password: 'Password is incorrect!!' },
                    user: { username: username }
                })
            }


        }
        catch (error) {
            res.send('error')

        }
    },





    get: (req, res) => {
        res.render('login', { errors: {}, user: {} })
    }

} 