const express = require("express");
const router = express.Router();
const medoo = require("./dbconfig.js");
require("./library.js")();

//getItems-------------------------------------------------------------
router.post("/getAllOrders", async function (req, res) {

  
  let orderDetails = await medoo.select("order_details", { "[><]users": { "userId": "rowId" }}  ,["users.userName", "users.phone", "users.address","order_details.grandTotal","order_details.rowId"],{"users.rowId":`${req.body.rowId}`})


  let itemDetails = await medoo.select("order_item_details", { "[><]items": { "itemId": "rowId" }}  ,["items.name","items.ingredient", "order_item_details.quantity", "order_item_details.discount","order_item_details.price","order_item_details.orderId"],{"order_item_details.orderId":`${orderDetails[0].rowId}`})
  // console.log(itemDetails);

  //data ready----------------------------------------------------------------------------------
  orderDetails[0].items=itemDetails;
   res.send(orderDetails);
});

//add Items-------------------------------------------------------------
router.post("/addOrder", async function (req, res) {

  let body = req.body[0];
  
  let data={};
  let orderdata = {};
 let subtotal = [];
  let discount = [];
  let promocode;
   data.rowId = randomid();
  data.orderId = data.rowId;

  //ordered items insertion----------------------------------------------
  req.body[0].items.forEach(async (element) => {
    data.itemId = element.rowId;
    data.name = element.name
    data.price =  element.price;
    data.quantity = element.quantity;
    data.discount = element.discount;

    subtotal.push(element.price);
    discount.push(element.discount);
    let result = await medoo.insert("order_item_details", data);

    console.log(`data successfully with inserted ID: ${result}`);
    
  });   

  
  if(body.promocode!=null)
  {
    let promo = await medoo.select("promocode",["promocode","discount"],{"userId":`${body.userId}`,"promocode":`${body.promocode}`});
   
    orderdata.promoDiscount = promo.discount;
    if(promo==false)
    {
      orderdata.promoDiscount =0;
    }
  }
else{

  orderdata.promoDiscount =0;
}


//grand total with details-------------------------------------------------------------------
  orderdata.rowId = data.rowId;
  orderdata.userId = body.userId;
  orderdata.subtotal = subtotal.reduce((a, b) => a + b, 0);
  orderdata.discount = discount.reduce((a, b) => a + b, 0);
  orderdata.shippingCharge =body.shippingCharge
  orderdata.tax = body.tax;
  
  orderdata.promoDiscount = 10;
  orderdata.grandtotal =orderdata.subtotal + orderdata.tax + orderdata.shippingCharge - (orderdata.discount + orderdata.promoDiscount);
  orderdata.status = 0;

  //insert order billing details------------------------------------
  let result = await medoo.insert("order_details", orderdata);
  console.log(result);
  res.send(`data successfully with inserted ID: ${orderdata}`);
});

//update menu Items--------------------------------------------------------
router.post("/updateOrders", async function (req, res) {
  let data = req.body;
});

//Delete menu Items---------------------------------------------------------
router.post("/deleteorders", async function (req, res) {});

module.exports = router;
