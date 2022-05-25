import express from 'express';

import {
  getAllShoes,
  getShoesByFilter,
  createShoe,
  updateShoe,
  deleteShoe,
  deleteShoePermantly,
} from './shoe.controller';

const router = express.Router();

router.get('/', getAllShoes);

router.get('/filter', getShoesByFilter);

router.post('/create', createShoe);

router.put('/:idShoe', updateShoe);

router.delete('/:idShoe', deleteShoe);

router.delete('/delete/:idShoe', deleteShoePermantly);

export default router;
