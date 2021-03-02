const express = require("express");
const router = express.Router();
const medoo = require("./dbconfig.js");
require("./library")();

//getItems-------------------------------------------------------------
router.post("/suggestion", async function (req, res) {
    let orderDetails = await medoo.select("order_details", { "[><]users": { "userId": "rowId" }}  ,["users.userName", "users.phone", "users.address","order_details.grandTotal","order_details.rowId"],{"users.rowId":`${req.body.rowId}`})


    let itemDetails = await medoo.select("order_item_details", { "[><]items": { "itemId": "rowId" }}  ,["items.name","items.ingredient", "order_item_details.quantity", "order_item_details.discount","order_item_details.price","order_item_details.orderId"],{"order_item_details.orderId":`${orderDetails[0].rowId}`})
    // console.log(itemDetails);
  
    //data ready----------------------------------------------------------------------------------
    // orderDetails[0].items=itemDetails;
    medoo.query(`select name from items where ingredient like ${itemDetails[0]}.ingredient `)
     res.send(itemDetails);

     
 
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




module.exports = router;
