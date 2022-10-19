const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// /PUT Update User
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
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
    if(req.body.userId === req.params.id || req.body.isAdmin){
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

//get all users
//follow a user
//unfollow a user

module.exports = router