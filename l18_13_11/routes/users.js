const express= require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validteUser, UserModel, validteLogin, createToken } = require("../models/userModel");
const router = express.Router();

// מאזין לכניסה לראוט של העמוד בית לפי מה שנקבע לראוטר
// בקובץ הקונפיג
router.get("/", async(req,res) => {
  res.json({msg:"Users work"});
})

// פונקציית מידלוואר
const auth = (req,res,next) => {
  let token = req.header("x-api-key");
  // בודק אם בכלל נשלח בהידר טוקן
  if(!token){
    return res.status(401).json({msg:"You must send to here token 1111"})
  }
  try{
    // עושה ההפך מקידוד , ומתרגם את המידע שעל הטוקן 
    // למידע שניתן להשתמש בו למשל האיי די של המשתמש
    let decodeToken = jwt.verify(token,"monkeysSecret");
    // נרצה לעבור לפונקציה הבאה בשרשור של הראוטר של אקספרס
    next();
  }
  catch(err){
    res.json({msg:"Token invalid or expired 222"})
  }
}

// auth -> פונקציית MIDDLEWARE
router.get("/myInfo",auth ,async(req,res) => {
  res.json({msg:"All good, token valid 333"})
})

// בודק טוקן ומחזיר לפי האיי די בטוקן את כל הרשומה
// של המשתמש בלי הסיסמא
router.get("/myUser",  async(req,res) => {
  // req.query , req.params, req.body , req.header
  let token = req.header("x-api-key");
  // בודק אם בכלל נשלח בהידר טוקן
  if(!token){
    return res.status(401).json({msg:"You must send to here token"})
  }
  try{
    // עושה ההפך מקידוד , ומתרגם את המידע שעל הטוקן 
    // למידע שניתן להשתמש בו למשל האיי די של המשתמש
    let decodeToken = jwt.verify(token,"monkeysSecret");

    // password:0 -> יחזיר את כל המאפיינים מלבד הסיסמא
    let data = await UserModel.findOne({_id:decodeToken._id},{password:0})
    res.json(data)
  }
  catch(err){
    res.json({msg:"Token invalid or expired"})
  }
})

// הרשמה של משתמש חדש
router.post("/", async(req,res) => {
  let validBody = validteUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    user.password = "*****";
    res.status(201).json(user)
  }
  catch(err){
    //TODO: check if the error is becuase duplicate email
    console.log(err);
    res.status(500).json(err);
  }
})

router.post("/login", async(req,res) => {
  let validBody = validteLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    // לבדוק אם מייל קייים בכלל במערכת
    let user = await UserModel.findOne({email:req.body.email})
    if(!user){
      return res.status(401).json({msg:"User or password not match , code:1"})
    }
    // שהסיסמא שהגיעה מהבאדי בצד לוקח תואמת לסיסמא המוצפנת במסד
    let passordValid = await bcrypt.compare(req.body.password,user.password)
    if(!passordValid){
     return res.status(401).json({msg:"User or password not match , code:2"})
    }
    let token = createToken(user._id);
    res.json({token:token})
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;