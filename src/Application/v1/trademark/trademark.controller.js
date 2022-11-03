import fs from 'fs-extra';
import TrademarkModel from './trademark.model';
import { uploadFile, deleteFile } from '../../../Utils/cloudFile';

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
  const { trademarkName } = req.body;
  const { files } = req;

  if (!files) {
    return res.status(400).json({
      message: 'Not file uploaded',
    });
  }

  try {
    let image = {};
    const result = await uploadFile(req.files.image.tempFilePath, 'trademarks');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    const trademark = await TrademarkModel.create({
      trademarkName,
      image,
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(201).json(trademark);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating trademark',
      code: 500,
    });
  }
};

export const updateTrademark = async (req, res) => {
  const { idTrademark } = req.params;
  const { trademarkName } = req.body;

  if (!trademarkName) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  if (!req.files?.image) {
    const data = await TrademarkModel.findOneAndUpdate(
      { _id: idTrademark },
      {
        trademarkName,
      }
    );
    return res.status(200).json(data);
  }

  try {
    let image = {};
    const actualData = await TrademarkModel.findById(idTrademark);
    await deleteFile(actualData.image.public_id);
    const result = await uploadFile(req.files.image.tempFilePath, 'trademarks');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.files.image.tempFilePath);

    const data = await TrademarkModel.findOneAndUpdate(
      { _id: idTrademark },
      {
        trademarkName,
        image,
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
