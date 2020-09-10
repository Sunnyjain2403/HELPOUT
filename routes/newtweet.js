const express = require("express");
const router = express.Router();

const tweet = require("../model/tweet");
const user = require("../model/user");
const comment = require("../model/comment");

const { genSalt, hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { check } = require("../jwt");

module.exports = async (req, res) => {
  try {
    const result = await user.findOne({ username: req.session.username });

    const tweets = new tweet({
      username: req.session.username,
      content: req.body.tweet,
      owner: result._id,
      anonymous: req.body.anonymous,
    });
    console.log(tweets);
    await tweets.save();
  } catch (e) {
    res.send("error");
  }
};
