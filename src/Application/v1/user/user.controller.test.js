// user.controller.test.js
import bcrypt from 'bcryptjs'; // Usa bcryptjs para evitar problemas de compatibilidad
import { jest } from '@jest/globals';
import { createUser } from './user.controller';
import UserModel from './user.model'; // Ajusta la importación según la estructura de tu proyecto

jest.mock('./user.model');
jest.mock('bcryptjs');

// eslint-disable-next-line no-undef
describe('createUser', () => {
  let req; let res;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    req = {
      body: {
        userName: 'testUserName',
        phone: '1234567890',
        address: 'testAddress',
        user: 'testUser',
        password: 'testPassword',
        userType: '1'
      },
      params: { offset: 0, limit: 10 },
      query: { status: 'active' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // eslint-disable-next-line no-undef
  it('should return 400 if the request body is empty', async () => {
    req.body = null;
    await createUser(req, res);
    // eslint-disable-next-line no-undef
    expect(res.status).toHaveBeenCalledWith(400);
    // eslint-disable-next-line no-undef
    expect(res.json).toHaveBeenCalledWith({
      message: '> Por favor complete todos los campos requeridos',
    });
  });

  // eslint-disable-next-line no-undef
  it('should return 400 if the user already exists', async () => {
    UserModel.findOne.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ user: 'testUser' })
    });

    await createUser(req, res);

    // eslint-disable-next-line no-undef
    expect(res.status).toHaveBeenCalledWith(400);
    // eslint-disable-next-line no-undef
    expect(res.json).toHaveBeenCalledWith({
      message: 'Este usuario ya esta en uso.',
    });
  });

  // eslint-disable-next-line no-undef
  it('should return 200 and create the user if the user does not exist', async () => {
    UserModel.findOne.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null)
    });
    UserModel.create.mockResolvedValue({
      userName: 'testUserName',
      phone: '1234567890',
      address: 'testAddress',
      user: 'testUser',
      password: 'hashedPassword',
      userType: '1'
    });
    bcrypt.hashSync.mockReturnValue('hashedPassword');

    await createUser(req, res);

    // eslint-disable-next-line no-undef
    expect(res.status).toHaveBeenCalledWith(200);
    // eslint-disable-next-line no-undef
    expect(res.json).toHaveBeenCalledWith({
      data: {
        userName: 'testUserName',
        phone: '1234567890',
        address: 'testAddress',
        user: 'testUser',
        password: 'hashedPassword',
        userType: '1'
      },
      status: 'ok'
    });
  });

  // eslint-disable-next-line no-undef
  it('should return 500 if an error occurs', async () => {
    UserModel.findOne.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      // exec: jest.fn().mockRejectedValue(new Error('Database error'))
    });

    await createUser(req, res);

    // eslint-disable-next-line no-undef
    expect(res.status).toHaveBeenCalledWith(500);
    // eslint-disable-next-line no-undef
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      message: '> No se pudo crear el usuario.',
    });
  });
});
