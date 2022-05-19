import express from 'express';

import {
  getAllShoes,
  createShoe,
  updateShoe,
  deleteShoe,
  deleteShoePermantly,
} from './shoe.controller';

const router = express.Router();

router.get('/', getAllShoes);

router.post('/create', createShoe);

router.put('/:idShoe', updateShoe);
router.delete('/:idShoe', deleteShoe);

router.delete('/delete/:idShoe', deleteShoePermantly);

export default router;
