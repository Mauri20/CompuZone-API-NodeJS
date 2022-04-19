import express from 'express';

import {
  getAllShoeModels,
  createShoeModel,
  updateShoeModel,
  deleteShoeModel,
  deleteShoeModelPermantly,
} from './shoeModel.controller';

const router = express.Router();

router.get('/', getAllShoeModels);

router.post('/create', createShoeModel);

router.put('/:idShoeModel', updateShoeModel);

router.delete('/:idShoeModel', deleteShoeModel);

router.delete('/delete/:idShoeModel', deleteShoeModelPermantly);

export default router;
