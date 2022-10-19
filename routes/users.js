const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// /PUT Update User
router.put("/:id", async (req, res) => {
    if(req.header("userId") === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body
                }
            );
            res.status(200).json("Account has been updated");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only update your account!");
    }
});

//DELETE user
router.delete("/:id", async (req, res) => {
    if(req.header("userId") === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("Account has been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your account!");
    }
});

//GET a user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});

//Follow user
router.put("/:id/follow", async (req, res) => {
    console.log(req.header("userId"));
    if(req.header("userId") !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.header("userId"));
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: { followers: req.header("userId") } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("user has been followed");
            }else{
                res.status(403).json("you already follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you can't follow your self!");
    }
});

//unfollow user

module.exports = router