const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validateUser, UserModel, validateLogin, createToken } = require("../models/usersModel");
const router = express.Router();

router.get("/", async (req, res) => {

  try {
    let data = await UserModel.find({});
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/myUser", async(req,res) => {
  // req.query , req.params, req.body , req.header
  let token = req.header("x-api-key");
  // בודק אם בכלל נשלח בהידר טוקן
  if(!token){
    return res.status(401).json({msg:"You must send to here token"})
  }
  try{
    let decodeToken = jwt.verify(token,"monkeysSecret");
    let data = await UserModel.findOne({_id:decodeToken._id}, {password:0})
  
    res.json(data);
  }
  catch(err){
    res.json({msg:"Token invalid or expired"})
  }
})

router.post("/login", async (req, res) => {

  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ msg: "User or Password doesn't match. code 1" })
    }
    let validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).json({ msg: "User or Password doesn't match. code 2" })
    }
    let token = createToken(user._id);
    res.json({ token: token })
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post("/", async (req, res) => {

  let validBody = validateUser(req.body);

  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    let user = new UserModel(req.body)
    user.password = await bcrypt.hash(user.password, 10)
    await user.save();
    user.password = "*****"
    res.status(201).json(user)
  }
  catch (err) {
    if (err.code == 11000) {
      return res.status(400).json({ msg: "Email already in system", code: 11000 })
    }
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
