const express = require("express");
const { ToyModel, validateToy, validateToyPut } = require("../models/toysModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();


//Route Alef
router.get("/", async (req, res) => {

  let perPage = Number(req.query.perPage) || 4;
  let page = Number(req.query.page) || 1;
  let sort = req.query.sort || "price";
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try {
    let data = await ToyModel.find({})
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse })
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

})

//Route that only fetches the data of the logged in users

router.get("/userList", auth, async(req,res) => {

  let perPage = Number(req.query.perPage) || 4;
  let page = Number(req.query.page) || 1
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;

  try{  
    let data = await ToyModel
    .find({user_id:req.tokenData._id})
    .limit(perPage)
    .skip((page-1) * perPage )
    .sort({[sort]:reverse})
    res.json(data); 
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

//Route Bet:

router.get("/search", async (req, res) => {

  let perPage = Number(req.query.perPage) ||4;
  let page = Number(req.query.page) || 1;
  let sort = req.query.sort || "price";
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try {
    let searchQ = req.query.s;
    let searchExp = new RegExp(searchQ, "i");

    let data = await ToyModel.find({ name: searchExp } && { info: searchExp })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//Route Gimel:

router.get("/category/:catname", async (req, res) => {

  let perPage = Number(req.query.perPage) || 4;
  let page = Number(req.query.page) || 1;
  let sort = req.query.sort || "price";
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try {
    let cat = req.params.catname;
    let catExp = new RegExp(cat, "i");


    let data = await ToyModel.find({ category_id: catExp })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//Route Dalet

router.post("/", async (req, res) => {

  let validateBody = validateToy(req.body);

  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details);
  }

  try {

    let toy = new ToyModel(req.body);

    toy.user_id = req.tokenData._id;

    await toy.save()

    res.status(201).json(toy)

  }

  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//Route Hei

router.put("/:idEdit", auth, async (req, res) => {
  let validBody = validateToyPut(req.body);

  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    let idEdit = req.params.idEdit;
    let data = await ToyModel.updateOne({ _id: idEdit, user_id: req.tokenData._id }, req.body)
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//Route Vav

router.delete("/:delId", auth, async (req, res) => {

  let idDdel = req.params.delId;

  try {
    let data = await ToyModel.deleteOne({ _id: idDdel, user_id: req.tokenData._id })
    res.json(data, { msg: "successfully deleted" });
  }

  catch (err) {
    console.log(err);
    res.status(500).json(err, { msg: "Something went wrong" });

  }
})


module.exports = router;