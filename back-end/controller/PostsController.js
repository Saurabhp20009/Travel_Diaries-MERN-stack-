const { postModel } = require("../Models/PostModel");
const { userModel } = require("../Models/UserModel");

//api to add post
const addPost = async (req, res) => {
  const { name, imageDir, date, desc } = req.body;

  if (!name || !imageDir || !date || !desc) {
    return res.json("Invalid details");
  }

  try {
    let user = await userModel.findOne(req.params);
    if (user) {
      let userId = user._id;
      let userName = user.name;
      let postSave = await new postModel({
        name,
        imageDir,
        date,
        desc,
        userId,
        userName,
      });
      let result = await postSave.save();

      if (result) {
        let tempPostArr = [...user.posts];
        tempPostArr.push(result._id);

        let final = await userModel.updateOne(req.params, {
          $set: { posts: tempPostArr },
        });
        res.status(200).send(final);
      }
    }
  } catch (error) {
    return res.json("error");
  }
};

//api to get all post
const getAllPosts = async (req, res) => {
  try {
    let result = await postModel.find();
    res.send(result);
  } catch (error) {
    return res.json("error");
  }
};

//api to edit post
const editPost = async (req, res) => {
  const { name, imageDir, date, desc, userId, userName } = req.body;

  if (!name || !imageDir || !date || !desc || !userId || !userName) {
    return res.json("Invalid details");
  }

  try {
    let result = await postModel.updateOne(req.params, { $set: req.body });
    if (result.acknowledged) {
      res.send(result);
    }
  } catch (error) {
    return res.json("error");
  }
};

//api to delete post
const deletePost = async (req, res) => {
  let post = await postModel.findOne(req.params);
  let userId = post.userId;

  let user = await userModel.findById(userId);
  let tempPostArr = [];

  tempPostArr = user.posts.filter((item) => item != req.params._id);

  try {
    let result = await userModel.updateOne(
      { _id: userId },
      { $set: { posts: tempPostArr } }
    );
    let delresult = await postModel.deleteOne(req.params);

    if (result.acknowledged && delresult.acknowledged) {
      res.send(result);
    }
  } catch (error) {
    return res.json("error");
  }
};

module.exports = { addPost, getAllPosts, editPost, deletePost };
