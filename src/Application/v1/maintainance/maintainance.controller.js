import MaintainanceModel from './maintainance.model';

export const createView = async (req, res) => {
  try {
    const data = await MaintainanceModel.findOneAndUpdate(
      {},
      { $inc: { views: 1 } },
      { new: true, upsert: true }
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the view.',
    });
  }
};

export const getViews = async (req, res) => {
  try {
    const data = await MaintainanceModel.findOne();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get the views.',
    });
  }
};
