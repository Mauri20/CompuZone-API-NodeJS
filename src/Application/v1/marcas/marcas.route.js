import express from 'express';

import {
  getAllmarcas,
  createMarcas,
  updateMarcas,
  deleteMarcas,
  deleteMarcasPermantly,
} from './marcas.controller';

const router = express.Router();

router.get('/', getAllmarcas);

router.post('/create', createMarcas);

router.put('/:idMarcas', updateMarcas);

router.delete('/:idMarcas', deleteMarcas);

router.delete('/delete/:idMarcas', deleteMarcasPermantly);

export default router;
