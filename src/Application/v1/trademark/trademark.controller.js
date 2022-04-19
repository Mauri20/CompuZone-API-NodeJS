import TrademarkModel from './trademark.model';

export const getAllTrademarks = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const query = TrademarkModel.find({}).skip(offset).limit(limit);

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all Trademarks',
    });
  }
};

export const createTrademark = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all fields required',
    });
  }

  try {
    const data = await TrademarkModel.create({
      trademarkName: body.trademarkName,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the Trademark.',
    });
  }
};

export const updateTrademark = async (req, res) => {
  const { body, params } = req;
  const { idTrademark } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  try {
    const data = await TrademarkModel.findOneAndUpdate(
      { _id: idTrademark },
      {
        trademarkName: body.trademarkName,
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

export const deleteTrademark = async (req, res) => {
  const { idTrademark } = req.params;

  try {
    const data = await TrademarkModel.findOneAndUpdate(
      { _id: idTrademark },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this Trademark.',
    });
  }
};

export const deleteTrademarkPermantly = async (req, res) => {
  const { idTrademark } = req.params;

  try {
    const data = await TrademarkModel.deleteOne({ _id: idTrademark });

    return res.status(200).json({
      ...data,
      status: 'deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this Trademark.',
    });
  }
};
