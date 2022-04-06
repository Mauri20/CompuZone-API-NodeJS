import CategorieModel from './categorie.model';

export const getAllCategories = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const query = CategorieModel.find({})
      .skip(offset)
      .limit(limit);

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    throw Error(error);
  }
};

export const createCategorie = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all files required',
    });
  }

  try {
    const pet = await CategorieModel.create(body);
    return res.status(200).json(pet);
  } catch (error) {
    // throw Error(error);
    return res.status(400).json({
      message: 'ni se puudooo',
    });
  }
};
