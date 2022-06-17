import express from 'express';

import {
  getAllCategories,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from './category.controller';

const router = express.Router();

router.get('/', getAllCategories);

router.post('/create', createCategorie);

router.put('/:idCategorie', updateCategorie);

router.delete('/:idCategorie', deleteCategorie);

export default router;
