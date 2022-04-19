import ShoeModel from './shoe.model';

export const getAllShoes = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const query = ShoeModel.find({})
      .skip(offset)
      .limit(limit)
      .populate('category', { categorieName: 1 })
      .populate({
        path: 'model',
        select: 'modelName',
        populate: { path: 'trademark', select: 'trademarkName' },
      })
      .populate('style', { styleName: 1 });

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all Shoes',
    });
  }
};

export const createShoe = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all fields required',
    });
  }

  try {
    const data = await ShoeModel.create({
      size: body.size,
      color: body.color,
      price: body.price,
      url: body.url,
      category: body.category,
      model: body.model,
      style: body.style,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the Shoe.',
    });
  }
};

export const updateShoe = async (req, res) => {
  const { body, params } = req;
  const { idShoe } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  try {
    const data = await ShoeModel.findOneAndUpdate(
      { _id: idShoe },
      {
        size: body.size,
        color: body.color,
        price: body.price,
        url: body.url,
        category: body.category,
        model: body.model,
        style: body.style,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt update the Shoe.',
    });
  }
};

export const deleteShoe = async (req, res) => {
  const { idShoe } = req.params;

  try {
    const data = await ShoeModel.findOneAndUpdate(
      { _id: idShoe },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this Shoe.',
    });
  }
};

export const deleteTrademarkPermantly = async (req, res) => {
  const { idShoe } = req.params;

  try {
    const data = await ShoeModel.deleteOne({ _id: idShoe });

    return res.status(200).json({
      ...data,
      status: 'deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this Shoe.',
    });
  }
};
