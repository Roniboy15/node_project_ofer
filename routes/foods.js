const express = require("express");
const { FoodModel, validateFood } = require("../models/foodModel")
const router = express.Router();

router.get("/", async (req, res) => {
  let perPage = Number(req.query.perPage) || 4;
  let page = Number(req.query.page) || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;

  try {
    let data = await FoodModel.find({})
    .limit(perPage)
    .skip((page-1)*perPage)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  //res.json({msg:"Foods works"});
  // let data = await FoodModel.find({});
  //res.json(data);
})

router.get("/search", async (req,res) => {
  let perPage = Number(req.query.perPage) || 4;
  let page = Number(req.query.page) || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  try {
    let searchQ = req.query.s;
    let searchExp = new RegExp(searchQ, "i");
    let data = await FoodModel.find({name:searchExp})
    .limit(perPage)
    .skip((page-1) * perPage)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post("/", async (req, res) => {

  let validBody = validateUser(req.body);

  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }

  try {
    let food = new FoodModel(req.body)
    await food.save();
    res.json(food)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.put("/:idEdit", async (req, res) => {

  let validBody = validateFood(req.body);

  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }

  try {
    let idEdit = req.params.idEdit;

    let data = await FoodModel.updateOne({_id:idEdit}, req.body)

    res.json(data)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete("/:idDel", async(req, res) => {

let idDel = req.params.idDel;

try {
  let data = await FoodModel.deleteOne({_id:idDel})
  res.json(data)
}
catch(err) {
  console.log(err)
  res.status(500).json(err)
}
})

module.exports = router;
