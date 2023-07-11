const router = require("express").Router();
const bcrypt =require('bcryptjs')
const User =require('../models/User.model');

const saltRound=13
/* GET signup page */
router.get("/signup", (req, res, next) => {
    res.render("auth/signup.ejs");
  });
  
  /* POST signup page */
  router.post("/signup", (req, res, next) => {

   bcrypt.genSalt(saltRound)
   .then((salt)=>{
    return bcrypt.hashSync(req.body.password, salt)
   })
   .then((passwordHash)=>{
    User.create({
        username: req.body.username,
        password: passwordHash
       })
       .then((userData)=>{
        console.log(userData)
        res.redirect("/");
       })
   })    
  });

/* GET login page */
router.get("/login", (req, res, next) => {
    res.render("auth/login.ejs");
  });
/* post login page */
router.post("/login", (req, res, next) => {
    const {username, password} =req.body 

    if(!username || !password) {
        res.render('auth/login.ejs', {errorMsg: 'All fields are mandatory'})
        return
    }
  
        User.findOne({username})
        .then((user)=>{
            if(!user){
                res.render('auth/login.ejs', {errorMsg: 'All fields are mandatory'})
            }
            else if(bcrypt.compareSync(password, user.password)){
                req.session.currentUser=username
                res.redirect("/");
            }
            else{
                res.render('auth/login.ejs', {errorMsg: 'wrong password'})
            }
        return
            }
        )
  



  });

  module.exports = router;
  