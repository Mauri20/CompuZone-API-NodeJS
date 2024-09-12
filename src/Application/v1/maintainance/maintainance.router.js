import express from 'express';

import {
  createView,
  getViews
} from './maintainance.controller';

const router = express.Router();

router.post('/', createView);

router.get('/', getViews);

export default router;
