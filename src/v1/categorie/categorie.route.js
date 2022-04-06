import express from 'express';
import { getAllCategories, createCategorie } from './categorie.controller';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/create', createCategorie);

export default router;
