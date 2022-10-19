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
//like post
//Get timeline posts

module.exports = router;