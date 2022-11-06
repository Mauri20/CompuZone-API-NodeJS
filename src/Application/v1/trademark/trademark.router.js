import express from 'express';
import fileUpload from 'express-fileupload';

import {
  getAllTrademarks,
  createTrademark,
  deleteTrademark,
} from './trademark.controller';

// import {
//   getAllTrademarks,
//   createTrademark,
//   updateTrademark,
//   deleteTrademark,
// } from './trademark.controller';

const router = express.Router();

router.get('/', getAllTrademarks);

router.post(
  '/create',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  createTrademark
);

// router.put(
//   '/:idTrademark',
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: './uploads',
//   }),
//   updateTrademark
// );

router.delete('/:idTrademark', deleteTrademark);

export default router;
