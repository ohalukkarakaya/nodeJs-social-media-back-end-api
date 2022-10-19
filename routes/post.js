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

//update post
//Delete post
//Get a post
//like post
//Get timeline posts

module.exports = router;