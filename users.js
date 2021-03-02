const express = require("express");
const router = express.Router();
const medoo = require("./dbconfig.js");
require("./library")();



//getusers-------------------------------------------------------------
router.get("/getUsers", async function (req, res) {

  let result = await medoo.select('users', ["userName", "email", "phone", "address"], {
    "userName": "hemendrasingh"
  });
  console.log(result);
  res.send(result);
});

//add users-------------------------------------------------------------
router.post("/addUsers", async function (req, res) {
  let data = req.body;
  data.rowId = randomid();
  data.usertype = 0; //bydefault normal users; for admin user =1
  data.status = 1;


  try {

    let result = await medoo.insert('users', data);
    res.send(`data successfully with insert id = ${result} `);

  } catch (err) {
    res.send(err);
  }
});

router.post("/updateUsers", async function (req, res) {
let data = req.body;

});

router.post("/deleteUsers", async function (req, res) {

});



module.exports = router;
