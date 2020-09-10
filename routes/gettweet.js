


const tweet = require('../model/tweet')
const user = require('../model/user')
const comment = require('../model/comment')


const { genSalt, hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { check } = require('../jwt')



module.exports =
    async (req, res) => {
        try {



            const userinfo = await user.findOne({ username: req.session.username })
            const result = await user.find({ follow: req.session.username })
                .select('tweet')
                .populate('tweet')
                .exec()
            var tweet = []
            result.forEach((e) => {
                tweet = tweet.concat(e.tweet)
            })

            tweet.reverse()

            res.render('home', { tweets: tweet, username: req.session.username, userinfo: userinfo })
        }
        catch (e) {
            res.send('error')
        }
    }

