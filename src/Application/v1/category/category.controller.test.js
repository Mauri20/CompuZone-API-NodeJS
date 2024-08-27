// category.controller.test.js
import { jest } from '@jest/globals';
import { getAllCategories } from './category.controller';
import CategorieModel from './category.model';

jest.mock('./category.model');

// eslint-disable-next-line no-undef
describe('getAllCategories', () => {
  let req; let res;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    req = {
      params: { offset: 0, limit: 10 },
      query: { status: 'active' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // eslint-disable-next-line no-undef
  it('should return 200 and the data when the query is successful', async () => {
    const mockData = [{ name: 'Category1' }, { name: 'Category2' }];
    CategorieModel.find.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockData)
    });

    await getAllCategories(req, res);

    // eslint-disable-next-line no-undef
    expect(res.status).toHaveBeenCalledWith(200);
    // eslint-disable-next-line no-undef
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  // eslint-disable-next-line no-undef
  it('should return 500 and an error message when an error occurs', async () => {
    CategorieModel.find.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(new Error('Database error'))
    });

    await getAllCategories(req, res);

    // eslint-disable-next-line no-undef
    expect(res.status).toHaveBeenCalledWith(500);
    // eslint-disable-next-line no-undef
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      message: '> It couldnt get all categories',
    });
  });
});
