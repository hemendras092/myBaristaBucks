
 module.exports = async function() { 
    
    this.randomid = randomid;      
    
   
} 










// for random id generation
function randomid() {
    var randomTxt = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    
    for (var i = 0; i < 6; i++)
    {
      randomTxt += possible.charAt(Math.floor(Math.random() * possible.length));
      
    }        
    

    
   return Date.now() +"-"+randomTxt;
  }
  

  