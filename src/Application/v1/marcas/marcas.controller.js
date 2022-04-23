import marcasModel from './marcas.model';

export const getAllmarcas = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const query = marcasModel.find({ status }).skip(offset).limit(limit);

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all Model',
    });
  }
};

export const createMarcas = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all files required',
    });
  }

  try {
    const data = await marcasModel.create({
      marcasName: body.marcasName,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the model.',
    });
  }
};

export const updateMarcas = async (req, res) => {
  const { body, params } = req;
  const { idModel } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all files required',
    });
  }

  try {
    const data = await marcasModel.findOneAndUpdate(
      { _id: idModel },
      {
        marcasName: body.marcasName,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt update the marcas.',
    });
  }
};

export const deleteMarcas = async (req, res) => {
  const { params } = req;
  const { idModel } = params;

  try {
    const data = await marcasModel.findOneAndUpdate(
      { _id: idModel },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this marcas.',
    });
  }
};

export const deleteMarcasPermantly = async (req, res) => {
  const { params } = req;
  const { idMarcas } = params;

  try {
    const data = await marcasModel.deleteOne({ _id: idMarcas });

    return res.status(200).json({
      ...data,
      status: 'deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this marcas.',
    });
  }
};
