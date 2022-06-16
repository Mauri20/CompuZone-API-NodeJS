import TrademarkModel from './trademark.model';

export const getAllTrademarks = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 6;
  const page = parseInt(req.query.page, 10) || 1;
  const { status = 'active' } = req.query;

  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'docs',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
  };

  const options = {
    page,
    limit,
    customLabels: myCustomLabels,
  };

  try {
    const data = await TrademarkModel.paginate({ status }, options);
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
      urlImage: body.urlImage,
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
        urlImage: body.urlImage,
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
