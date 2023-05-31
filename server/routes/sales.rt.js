import express from 'express';
import { getSales } from '../controllers/sales.ctrl.js'

const router = express.Router();


router.get('/salesoverall', getSales);

export default router;