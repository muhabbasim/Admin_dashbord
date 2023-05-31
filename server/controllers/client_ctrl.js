import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import getCountryIso3 from 'country-iso-2-to-3'



// get user account
export const getProducts = async (req, res) => {
  try {
    const products =  await Product.find()
    const productWithState = await Promise.all(
      products.map( async (product) => {
        const stat = await ProductStat.find({ productId: product._id })

        return {
          ...product._doc, 
          stat
        }
      })
    )
    res.status(200).json(productWithState)
  } catch (error) {
    res.status(404).json({ message: error.message }); 
  }

}

// get customers
export const getCustomers = async (req, res) => {
  try {
    const customers =  await User.find({ role: 'user' }).select("-password")
    res.status(200).json(customers)
  } catch (error) {
    res.status(404).json({ message: error.message }); 
  }

}

// get transactions (server side paginations)
export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    // formatted sort should look like { userId: -1 }

    // const { page = 1, pageSize = 200, sort = null, search = "" } = req.query;

    // const generateSort = () => {
    //   const sortParsed = JSON.parse(sort);
    //   const sortFormatted = {
    //     [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
    //   };

    //   return sortFormatted;
    // };

    // const sortFormatted = Boolean(sort) ? generateSort() : {};

    // const transactions = await Transaction.find({
    //   $or: [
    //     { cost: { $regex: new RegExp(search, "i") } },
    //     { userId: { $regex: new RegExp(search, "i") } },
    //   ],
    // }).sort(sortFormatted).skip(page * pageSize).limit(pageSize);

    // const total = await Transaction.countDocuments({
    //   name: { $regex: search, $options: "i" },
    // });

    // res.status(200).json({
    //   transactions,
    //   total,
    // });

    const transactions = await Transaction.find({});
    res.status(200).json({ transactions });
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// get geography
export const getGeography = async (req, res) => {
  try {
    const users =  await User.find();

    //covert 2 letters country in user to 3 letters
    const mappedLocations = users.reduce(( acc, { country }) => { // acc === accumulater
      const countryISO3 = getCountryIso3(country);
      if(!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++; 
      return acc;
    }, {})

    // make the format for nivo choropleth data
    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
      return { id: country, value: count }
    })

    res.status(200).json(formattedLocations)
  } catch (error) {
    res.status(404).json({ message: error.message }); 
  }

}
