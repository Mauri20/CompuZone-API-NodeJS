import StyleModel from './style.model';

export const getAllStyles = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const query = StyleModel.find({ status }).skip(offset).limit(limit);

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all styles',
    });
  }
};

export const createStyle = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all fields required',
    });
  }

  try {
    const data = await StyleModel.create({
      styleName: body.styleName,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the style.',
    });
  }
};

export const updateStyle = async (req, res) => {
  const { body, params } = req;
  const { idStyle } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  try {
    const data = await StyleModel.findOneAndUpdate(
      { _id: idStyle },
      {
        styleName: body.styleName,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt update the style.',
    });
  }
};
export const deleteStyle = async (req, res) => {
  const { idStyle } = req.params;

  try {
    const data = await StyleModel.findOneAndUpdate(
      { _id: idStyle },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this style.',
    });
  }
};
