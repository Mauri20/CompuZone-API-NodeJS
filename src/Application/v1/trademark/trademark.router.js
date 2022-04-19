import express from 'express';

import {
  getAllTrademarks,
  createTrademark,
  updateTrademark,
  deleteTrademark,
  deleteTrademarkPermantly,
} from './trademark.controller';

const router = express.Router();

router.get('/', getAllTrademarks);

router.post('/create', createTrademark);

router.put('/:idTrademark', updateTrademark);

router.delete('/:idTrademark', deleteTrademark);

router.delete('/delete/:idTrademark', deleteTrademarkPermantly);

export default router;
