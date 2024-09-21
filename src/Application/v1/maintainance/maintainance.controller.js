import computersModel from '../shoe/computers.model';
import styleModel from '../shoeStyle/style.model';
import trademarkModel from '../trademark/trademark.model';
import userModel from '../user/user.model';
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
  const generalData ={
    views:0,
    trademarks :0,
    styles :0,
    users:0,
    items:0,
    orders:30,
  };
  try {
    generalData.views=await MaintainanceModel.findOne();
    generalData.trademarks=await trademarkModel.find();
    generalData.styles=await styleModel.find();
    generalData.users=await userModel.find();
    generalData.items=await computersModel.find();

    return res.status(200).json(generalData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get the views.',
    });
  }
};
