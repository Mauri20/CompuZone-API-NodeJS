import express from 'express';
import categorieRoutes from './category/category.route';

const router = express.Router();

router.use('/categories', categorieRoutes);

export default router;
