import ShoeModelModel from './shoeModel.model';

export const getAllShoeModels = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const query = ShoeModelModel.find({})
      .skip(offset)
      .limit(limit)
      .populate('trademark', { trademarkName: 1, _id: 0 });

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
      trademark: body.trademark,
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
        trademark: body.trademark,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt update the Trademark.',
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

export const deleteShoeModelPermantly = async (req, res) => {
  const { idShoeModel } = req.params;

  try {
    const data = await ShoeModelModel.deleteOne({ _id: idShoeModel });

    return res.status(200).json({
      ...data,
      status: 'deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this Model.',
    });
  }
};
