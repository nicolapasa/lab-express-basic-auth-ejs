const router = require("express").Router();
const { isLoggedIn} = require('../middlewares/route-guard.middleware')
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



router.get("/main", (req, res, next) => {
  res.render("main.ejs");
});

router.get("/private", isLoggedIn, (req, res, next) => {
  res.render("private.ejs");
});


module.exports = router;
