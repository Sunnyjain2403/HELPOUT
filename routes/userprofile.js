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
    const user1 = await user.findOne({ username: req.params.username });
    await user1.populate("tweet").execPopulate();

    res.render("profile", {
      tweets: user1.tweet,
      user: user1,
      username: req.session.username,
    });
  } catch (e) {
    res.send("error");
  }
};
