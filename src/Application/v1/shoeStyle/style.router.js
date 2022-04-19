import express from 'express';

import {
  getAllStyles,
  createStyle,
  updateStyle,
  deleteStyle,
  deleteStylePermantly,
} from './style.controller';

const router = express.Router();

router.get('/', getAllStyles);

router.post('/create', createStyle);

router.put('/:idStyle', updateStyle);

router.delete('/:idStyle', deleteStyle);

router.delete('/delete/:idStyle', deleteStylePermantly);

export default router;
