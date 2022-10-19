const router = require("express").Router();
const { response } = require("express");
const Post = require("../models/Post");

//Create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        response.status(500).json(err);
    }
});

//Update post
router.put("/:id", async (req, res) => {
    try{
      const post = await Post.findById(req.params.id);
      if(post.userId === req.body.userId){
        await post.updateOne({$set: req.body});
        res.status(200).json("The post has been update");
      }else{
        res.status(403).json("you can only update your posts");
      }
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete post
router.delete("/:id", async (req, res) => {
    try{
      const post = await Post.findById(req.params.id);
      if(post.userId === req.header("userId")){
        await post.deleteOne();
        res.status(200).json("The post has been deleted");
      }else{
        res.status(403).json("you can only delete your posts");
      }
    }catch(err){
        res.status(500).json(err);
    }
});

//Get a post
router.get("/:id", async (req,res) => {
    try{
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    }catch(err){
      res.status(500).json(err);
    }
});

//Like - Dislike post
router.put("/:id/like", async (req,res) => {
    try{
      const post = await Post.findById(req.params.id);
      if(!post.likes.includes(req.header("userId"))){
        await post.updateOne({$push: {likes: req.header("userId")}});
        res.status(200).json("The post has been liked");
      }else{
        await post.updateOne({$pull: {likes: req.header("userId")}});
        res.status(200).json("The post has been disliked");
      }
    }catch(err){
      res.status(500).json(err);
    }
});

//Get timeline posts

module.exports = router;