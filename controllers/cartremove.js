
const Userschemadb = require('../models/user');


// Update user cart
async function CartPut(req, res) {
    try {
      const updatedCart = req.body;
      const user = req.user;
  
      console.log(updatedCart,"data from front end delete");
      
      if (!user || !user.email) {
        return res.status(400).send({ message: 'User information is missing' });
      }
  
      const check = await Userschemadb.findOne({ email: user.email });

 console.log(check,"db ckeck");
 
      if (check) {



        check.cart = await Userschemadb.updateOne({email:user.email},{$pull:{check:updatedCart}})
        await check.save();
        return res.status(200).send({ message: 'Cart updated successfully' });
      } else {
        return res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).send({ message: 'Error updating cart', error });
    }
  }
  module.exports = { CartPut };
