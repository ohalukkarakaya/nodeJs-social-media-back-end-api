const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("post route");
});

module.exports = router;