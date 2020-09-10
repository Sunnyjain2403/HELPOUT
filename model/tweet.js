const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema(
  {
    username: { type: String, required: true },

    content: { type: String, required: true },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    anonymous: {
      type: Boolean,
      required: true,
    },
    like: [],
  },
  { timestamps: true }
);
userschema.virtual("comment", {
  ref: "comment",
  localField: "_id",
  foreignField: "owner",
});

module.exports = mongoose.model("tweet", userschema);
