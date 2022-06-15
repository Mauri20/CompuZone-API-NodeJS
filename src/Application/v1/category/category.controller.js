import CategorieModel from './category.model';

export const getAllCategories = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const query = CategorieModel.find({ status }).skip(offset).limit(limit);

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all categories',
    });
  }
};

export const createCategorie = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all fields required',
    });
  }

  try {
    const data = await CategorieModel.create({
      categorieName: body.categorieName,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the category.',
    });
  }
};

export const updateCategorie = async (req, res) => {
  const { body, params } = req;
  const { idCategorie } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  try {
    const data = await CategorieModel.findOneAndUpdate(
      { _id: idCategorie },
      {
        categorieName: body.categorieName,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt update the category.',
    });
  }
};

export const deleteCategorie = async (req, res) => {
  const { params } = req;
  const { idCategorie } = params;

  try {
    const data = await CategorieModel.findOneAndUpdate(
      { _id: idCategorie },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this category.',
    });
  }
};
