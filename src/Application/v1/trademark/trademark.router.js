import express from 'express';

import {
  getAllTrademarks,
  createTrademark,
  updateTrademark,
  deleteTrademark,
} from './trademark.controller';

const router = express.Router();

router.get('/', getAllTrademarks);

router.post('/create', createTrademark);

router.put('/:idTrademark', updateTrademark);

router.delete('/:idTrademark', deleteTrademark);

export default router;
