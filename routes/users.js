const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// /PUT Update User
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.user.isAdmin){
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

//get a user
//get all users
//follow a user
//unfollow a user

module.exports = router