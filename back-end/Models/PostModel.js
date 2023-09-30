const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String, require: true },
  imageDir: { type: String, require: true },
  date: { type: String, require: true },
  desc: { type: String, require: true },
  userId : {type : mongoose.Schema.Types.ObjectId, ref:"users" },
  userName: { type: String, require: true }
});

const postModel = mongoose.model("posts", postSchema);

module.exports = { postModel };
