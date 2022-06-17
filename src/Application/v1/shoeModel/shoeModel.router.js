import express from 'express';

import {
  getAllShoeModels,
  createShoeModel,
  updateShoeModel,
  deleteShoeModel,
} from './shoeModel.controller';

const router = express.Router();

router.get('/', getAllShoeModels);

router.post('/create', createShoeModel);

router.put('/:idShoeModel', updateShoeModel);

router.delete('/:idShoeModel', deleteShoeModel);

export default router;
