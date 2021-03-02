const express = require("express");
const router = express.Router();
const medoo = require("./dbconfig.js");
require("./library")();

//getItems-------------------------------------------------------------
router.get("/getItems", async function (req, res) {
  let result = await medoo.select("items", ["rowId","name", "ingredient", "price"]);
  console.log(result);
  res.send(result);
});


//add Items-------------------------------------------------------------
router.post("/addItems", async function (req, res) {
  let data = req.body;
  data.rowId = randomid();
  data.status = 1;

  try {
    let result = await medoo.insert("items", data);
    res.send(`data successfully with inserted ID: ${result}`);
  } catch (err) {
    res.send(err);
  }
});



//update menu Items--------------------------------------------------------
router.post("/updateItems", async function (req, res) {
  let data = req.body;
});



//Delete menu Items---------------------------------------------------------
router.post("/deleteItems", async function (req, res) {});

module.exports = router;
