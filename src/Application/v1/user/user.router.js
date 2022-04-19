import express from 'express';

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteUserPermantly,
} from './user.controller';

const router = express.Router();

router.get('/', getAllUsers);

router.post('/create', createUser);

router.put('/:idUser', updateUser);

router.delete('/:idUser', deleteUser);

router.delete('/delete/:idUser', deleteUserPermantly);

export default router;
