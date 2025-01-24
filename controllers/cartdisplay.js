

const User = require('../models/user');


async function CartGet (req, res){
  try {
    console.log('haii')
    const user = req.user;
    if (!user || !user.email) {
      return res.status(400).send({ message: 'User information is missing' });
    }

    const check = await User.findOne({ email: user.email });
    console.log(check,'for card ispaly')
    if (check) {
      console.log(check.cart,"check cart")
      return res.status(200).send({ cart: check.cart });
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send({ message: 'Error fetching cart', error });
  }
}

module.exports = { CartGet }


