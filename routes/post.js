const express = require("express");
const route = express.Router();
const Post = require("../models/Post");
const connect = require("../config/db");
const { updateOne } = require("../models/Post");

// get all posts
route.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json({ data: posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

// add a post
route.post("/", async (req, res) => {
  const { author, title, body } = req.body;
  if (author === "" || title === "" || body === "") {
    res.status(400).json({ status: 400, message: "Fill all fields" });
  }

  // save the info into the database
  const newPost = new Post({
    author,
    title,
    body,
  });

  try {
    await newPost.save();
    res.status(200).json({ status: 200, message: "Post was added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

// get a single post
route.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json({ data: post });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

// delete a post
route.delete("/:id", async (req, res) => {
  await Post.deleteOne({ _id: req.params.id });
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

// update a post
route.put("/:id", async (req, res) => {
  const updatePost = {};
  const { author, title, body } = req.body;
  if (author) updatePost.author = author;
  if (title) updatePost.title = title;
  if (body) updatePost.body = body;
  try {
    let post = await Post.findById(req.params.id);
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatePost,
      },
      { new: true }
    );
    res.json({ data: post });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

module.exports = route;
