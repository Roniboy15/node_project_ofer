const express = require("express");
const { ToyModel, validateToy, validateToyPut } = require("../models/toysModel");
const router = express.Router();

//Route Alef
router.get("/", async (req, res) => {

    let perPage = Number(req.query.perPage) || 10;
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

//Route Bet:

router.get("/search", async (req,res) => {

    let perPage = Number(req.query.perPage) || 4;
    let page = Number(req.query.page) || 1;
    let sort = req.query.sort || "price";
    let reverse = req.query.reverse == "yes" ? -1 : 1;

    try {
      let searchQ = req.query.s;
      let searchExp = new RegExp(searchQ, "i");

      let data = await ToyModel.find({name:searchExp} && {info:searchExp})
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

  //Route Gimel:

  router.get("/category/:catname", async (req,res) => {

    let perPage = Number(req.query.perPage) || 4;
    let page = Number(req.query.page) || 1;
    let sort = req.query.sort || "price";
    let reverse = req.query.reverse == "yes" ? -1 : 1;

    try {
      let cat = req.params.catname;
      let catExp = new RegExp(cat, "i");


      let data = await ToyModel.find({category:catExp})
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

  //Route Dalet

  router.post("/", async (req,res) => {

    let validateBody = validateToy(req.body)

    if (!validateBody) {
        return res.status(400).json(validateBody.details);
      }

      try {
    
        let toy = new ToyModel(req.body)
        await toy.save()
        res.status(201).json(toy)

      }

      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    
  })

  //Route Hei

  router.put("/:idEdit",async(req,res) => {
    let validBody = validateToyPut(req.body);

    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try{
      let idEdit = req.params.idEdit;
      let data = await ToyModel.updateOne({_id:idEdit},req.body)
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })

  router.delete("/:delId", async (req, res) => {
    
    let idDdel = req.params.delId;
    try{
     let data = await ToyModel.deleteOne({_id:idDdel})
     res.json(data)
    }

    catch (err) {
      console.log(err);
      res.status(500).json(err);

    }
  })


module.exports = router;