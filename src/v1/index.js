import express from 'express';
import categorieRoutes from './categorie/categorie.route';

const router = express.Router();

router.use('/categories', categorieRoutes);

export default router;
