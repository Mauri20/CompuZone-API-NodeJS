import express from 'express';

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
} from './user.controller';

const router = express.Router();

router.get('/', getAllUsers);

router.post('/create', createUser);

router.post('/login', login);

router.put('/:idUser', updateUser);

router.delete('/:idUser', deleteUser);

export default router;
