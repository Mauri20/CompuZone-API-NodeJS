/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
import fs from 'fs-extra';
import ShoeModel from './computers.model';
import { uploadFile } from '../../../Utils/cloudFile';

export const getAllShoes = async (req, res) => {
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
    populate: [
      { path: 'category', select: 'categorieName' },
      { path: 'trademark', select: 'trademarkName' },
      {
        path: 'model',
        select: 'modelName',
      },
      { path: 'style', select: 'styleName' },
    ],
    customLabels: myCustomLabels,
  };

  try {
    const data = await ShoeModel.paginate({ status }, options);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all Shoes',
    });
  }
};

export const getShoesByFilter = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 6;
  const page = parseInt(req.query.page, 10) || 1;
  const { trademarkId } = req.query;
  const categoryId = req.query.categoryId || 0;
  const styleId = req.query.styleId || 0;
  const { status = 'active' } = req.query;
  const { id } = req.query;

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
    populate: [
      { path: 'category', select: 'categorieName' },
      {
        path: 'trademark',
        select: 'trademarkName',
      },
      {
        path: 'model',
        select: 'modelName',
      },
      { path: 'style', select: 'styleName' },
    ],
    customLabels: myCustomLabels,
  };
  let filterParam;
  if (categoryId !== 0 && styleId === 0) {
    filterParam = {
      status,
      trademark: { _id: trademarkId },
      category: { _id: categoryId },
    };
  }
  if (categoryId !== 0 && styleId !== 0) {
    filterParam = {
      status,
      trademark: { _id: trademarkId },
      category: { _id: categoryId },
      style: { _id: styleId },
    };
  }
  if (categoryId === 0 && styleId !== 0) {
    filterParam = {
      status,
      trademark: { _id: trademarkId },
      style: { _id: styleId },
    };
  }
  if (categoryId === 0 && styleId === 0) {
    filterParam = {
      status,
      trademark: { _id: trademarkId },
    };
  }
  if (id) {
    filterParam = {
      status,
      _id: id,
    };
  }
  try {
    const data = await ShoeModel.paginate(filterParam, options);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all Shoes',
    });
  }
};

export const createShoe = async (req, res) => {
  const { size, color, price, category, trademark, model, style } = req.body;
  const { files } = req;

  if (!files) {
    return res.status(400).json({
      message: 'Not file uploaded',
    });
  }

  try {
    let image = {};
    const result = await uploadFile(req.files.image.tempFilePath, 'shoes');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    const data = await ShoeModel.create({
      size,
      color,
      price,
      image,
      category,
      trademark,
      model,
      style,
    });
    fs.unlinkSync(req.files.image.tempFilePath);
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
        trademark: body.trademark,
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
