import express from 'express';
import fileUpload from 'express-fileupload';

import {
  getAllShoes,
  getShoesByFilter,
  createShoe,
  updateShoe,
  deleteShoe,
} from './shoe.controller';

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

router.put('/:idShoe', updateShoe);

router.delete('/:idShoe', deleteShoe);

export default router;
