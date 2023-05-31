import User from '../models/User.js'
import Transaction from '../models/Transaction.js'
import mongoose from 'mongoose';

// get admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin"}).select("-password")
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

// get user performance
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params
    // called aggregate calls for mongoose db ( join tables )

    const userWithStats = await User.aggregate([
      // form id in objectID form and match id from users
      { $match: { _id: new mongoose.Types.ObjectId(id) }},
      // look up the information match from other data
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliatestats", // create new field 
        }
      },
      // to straightend the data
      { $unwind: "$affiliatestats"}
    ])
    
    const salesTransactions = await Promise.all(
      userWithStats[0].affiliatestats.affiliateSales.map((id) => {
        return Transaction.findById(id)
      })
    )
    
    const filteredSalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    )

    res.status(200).json({ user: userWithStats[0], sales: filteredSalesTransactions})
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}