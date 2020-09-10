const express = require("express");
const router = express.Router();

const multer = require("multer");
const { check } = require("express-validator");
const { verify } = require("../jwt");
const { notverify } = require("../notoken");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 10,
  },

  fileFilter: fileFilter,
});

const comment = require("./comment");
const follow = require("./follow");
const gettweet = require("./gettweet");
const like = require("./like");
const login = require("./login");
const newtweet = require("./newtweet");
const search = require("./search");
const signup = require("./signup");
const tweetpage = require("./tweetpage");
const userprofile = require("./userprofile");
const profile_edit = require("./profile_edit");
const upload2 = require("./upload");
const logout = require("./logout");

router.post("/comment", verify, comment);
router.post("/follow", verify, follow);
router.get("/tweets", verify, gettweet);
router.post("/toggle", verify, like);

router.get("/login", notverify, login.get);
router.post("/login", notverify, login.post);

router.post("/tweet", verify, newtweet);
router.post("/search", verify, search);

router.post(
  "/signup",
  [
    check("password")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 chars long"),
  ],
  signup.post
);

router.get("/upload", notverify, upload2.get);
router.post("/upload", notverify, upload.single("upload"), upload2.post);
router.get("/logout", verify, logout);
router.get("/signup", notverify, signup.get);
router.get("/tweet/:id", verify, tweetpage);
router.get("/profile/:username", verify, userprofile);
router.get("/profile_edit", verify, profile_edit.get);
router.post(
  "/profile_edit",
  verify,
  upload.single("upload"),
  profile_edit.post
);

module.exports = router;
