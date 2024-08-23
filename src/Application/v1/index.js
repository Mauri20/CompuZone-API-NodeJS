import express from 'express';
import categorieRoutes from './category/category.route';
import styleRoutes from './shoeStyle/style.router';
import trademarkRoutes from './trademark/trademark.router';
import shoeRoutes from './shoe/computers.router';
import userRoutes from './user/user.router';

const router = express.Router();

router.use('/categories', categorieRoutes);
router.use('/styles', styleRoutes);
router.use('/trademark', trademarkRoutes);
router.use('/shoes', shoeRoutes);
router.use('/users', userRoutes);

export default router;
