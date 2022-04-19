import express from 'express';
import categorieRoutes from './category/category.route';
import styleRoutes from './shoeStyle/style.router';
import trademarkRoutes from './trademark/trademark.router';
import shoeModelRoutes from './shoeModel/shoeModel.router';
import shoeRoutes from './shoe/shoe.router';

const router = express.Router();

router.use('/categories', categorieRoutes);
router.use('/styles', styleRoutes);
router.use('/trademark', trademarkRoutes);
router.use('/models', shoeModelRoutes);
router.use('/shoes', shoeRoutes);

export default router;
