import ShoeModelModel from './shoeModel.model';

export const getAllShoeModels = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const query = ShoeModelModel.find({ status }).skip(offset).limit(limit);

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all ShoeModels',
    });
  }
};
export const createShoeModel = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all fields required',
    });
  }

  try {
    const data = await ShoeModelModel.create({
      modelName: body.modelName,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the ShoeModel.',
    });
  }
};
export const updateShoeModel = async (req, res) => {
  const { body, params } = req;
  const { idShoeModel } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  try {
    const data = await ShoeModelModel.findOneAndUpdate(
      { _id: idShoeModel },
      {
        modelName: body.modelName,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt update the Model.',
    });
  }
};

export const deleteShoeModel = async (req, res) => {
  const { idShoeModel } = req.params;

  try {
    const data = await ShoeModelModel.findOneAndUpdate(
      { _id: idShoeModel },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this Model.',
    });
  }
};
