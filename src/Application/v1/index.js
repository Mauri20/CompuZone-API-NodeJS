import express from 'express';
import categorieRoutes from './category/category.route';
import marcasRoute from './marcas/marcas.route';

const router = express.Router();

router.use('/categories', categorieRoutes);
router.use('/marcas', marcasRoute);

export default router;
