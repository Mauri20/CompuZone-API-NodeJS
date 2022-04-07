import express from 'express';

import {
  getAllCategories,
  createCategorie,
  updateCategorie,
  deleteCategorie,
  deleteCategoriePermantly
} from './categorie.controller';

const router = express.Router();

router.get('/', getAllCategories);

router.post('/create', createCategorie);

router.put('/:idCategorie', updateCategorie);

router.delete('/:idCategorie', deleteCategorie);

router.delete('/delete/:idCategorie', deleteCategoriePermantly);

export default router;
