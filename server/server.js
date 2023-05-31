import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import connectDB from './db/connection.js'
import clientRoutes from './routes/client_rt.js';
import generalRoutes from './routes/general_rt.js';
import managementRoutes from './routes/management_rt.js';
import salesRoutes from './routes/sales.rt.js';

// sending data to mongodb
import User from './models/User.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from './data/data.js'

/* CONGIGRATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://admin-client-api.onrender.com'],
  credentials: true
}));

/* ROUTES */
app.use('/api/client', clientRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/management', managementRoutes);
app.use('/api/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8800;
const dbConnection = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
  } catch (error) {
    console.log(error);
  }
} 
  
app.listen(PORT, () => {
  dbConnection()

  /* ONLY ADD DATA ONE TIME */
  
  // User.insertMany(dataUser);
  // Product.insertMany(dataProduct);
  // ProductStat.insertMany(dataProductStat);
  // Transaction.insertMany(dataTransaction);
  // OverallStat.insertMany(dataOverallStat);
  // AffiliateStat.insertMany(dataAffiliateStat);

  console.log(`Server is up & running on port: ${PORT}`);
})

