
const user = require('../model/user')

const { body, validationResult } = require('express-validator');
const { genSalt, hash } = require('bcryptjs')






module.exports = {
    get: async (req, res) => {
        res.render('signup')
    },

    post: async (req, res) => {

        try {
            const salt = await genSalt(8)
            const hashpassword = await hash(req.body.password, salt)

            const newuser = new user({
                email: req.body.email,
                username: req.body.username,
                password: hashpassword,
                dateofbirth: req.body.dateofbirth,
                bio: req.body.bio,
                follow: [req.body.username],
                followers: []
            }
            )
            const findUser = await user.findOne({ email: req.body.email })

            if (findUser) {

                const error1 = { errors: [{ 'msg': 'email already exist' }] }
                return res.send(error1)

            }

            const findUser2 = await user.findOne({ username: req.body.username })
            if (findUser2) {

                const error2 = { errors: [{ 'msg': 'username already exist' }] }
                return res.send(error2)

            }


            const error3 = validationResult(req)

            if (error3.errors.length != 0) {
                return res.send(error3)
            }

            // console.log(req.body.confirmpassword)
            if (req.body.password != req.body.confirmpassword) {
                const error4 = { errors: [{ 'msg': 'password does not match' }] }
                return res.send(error4)
            }


            await newuser.save()
            return res.send({ errors: [] });
        }

        catch (e) {
            res.status('404').send('error')
        }
    }
}