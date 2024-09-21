import express from 'express';
import fileUpload from 'express-fileupload';

import {
  getAllShoes,
  getShoesByFilter,
  createShoe,
  updateShoe,
  deleteShoe,
  addData,
} from './computers.controller';

const router = express.Router();

router.get('/', getAllShoes);

router.get('/filter', getShoesByFilter);

router.post(
  '/create',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  createShoe
);

router.post('/adddata',addData);

router.put('/:idShoe', updateShoe);

router.delete('/:idShoe', deleteShoe);

export default router;
