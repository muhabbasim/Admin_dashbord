import mongoose from 'mongoose';

const AffiliateStatSchema = new mongoose.Schema(

  // called aggregate calls for mongoose db ( join tables )

  {
    userId: { 
      type: mongoose.Types.ObjectId, 
      ref: "User"
    },

    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true}
);

const AffiliateStat = mongoose.model('AffiliateStat', AffiliateStatSchema)
export default AffiliateStat