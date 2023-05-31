import express from 'express';
import { getAdmins, getUserPerformance } from '../controllers/management_ctrl.js';

const router = express.Router();

router.get('/admin', getAdmins)
router.get('/performance/:id', getUserPerformance)

export default router;