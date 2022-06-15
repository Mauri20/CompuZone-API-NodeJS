import UserModel from './user.model';

const bcrypt = require('bcryptjs');

export const getAllUsers = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const query = UserModel.find({ status }).skip(offset).limit(limit);

    const data = await query.exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt get all Users',
    });
  }
};

export const createUser = async (req, res) => {
  const { body } = req;
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all fields required',
    });
  }
  try {
    const query = UserModel.findOne({ user: body.user, status })
      .skip(offset)
      .limit(limit);
    const data_ = await query.exec();

    if (data_ !== null) {
      return res.status(400).json({
        message: 'This user has already on use.',
      });
    }
    const data = await UserModel.create({
      userName: body.userName,
      phone: body.phone,
      user: body.user,
      password: bcrypt.hashSync(body.password, 12),
      userType: body.userType,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt create the User.',
    });
  }
};

// eslint-disable-next-line consistent-return
export const login = async (req, res) => {
  const { body } = req;
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required.',
    });
  }
  try {
    const query = UserModel.findOne({ user: body.user, status })
      .skip(offset)
      .limit(limit);
    const data = await query.exec();
    if (data !== null) {
      // eslint-disable-next-line consistent-return
      bcrypt.compare(body.password, data.password, (err, match) => {
        if (err) {
          console.log('> There are some issues on:', err);
        } else {
          if (match) {
            let rolType = '';
            if (data.userType === '1') {
              rolType = 'root';
            } else if (data.userType === '0') {
              rolType = 'common';
            }
            return res.status(200).json({
              message: 'The user has been found successfully.',
              rol: rolType,
            });
          }

          return res
            .status(400)
            .json({ message: 'Please verify your data and do it again.' });
        }
      });
    } else {
      return res
        .status(400)
        .json({ message: 'This user doesnt exist, probably has been deleted' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: '> It couldnt match the user.',
    });
  }
};

export const updateUser = async (req, res) => {
  const { body, params } = req;
  const { idUser } = params;
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  try {
    const query = UserModel.findOne({ user: body.user, status })
      .skip(offset)
      .limit(limit);
    const data_ = await query.exec();

    if (data_ !== null) {
      return res.status(400).json({
        message: 'This user has already on use.',
      });
    }

    const data = await UserModel.findOneAndUpdate(
      { _id: idUser },
      {
        userName: body.userName,
        phone: body.phone,
        user: body.user,
        password: body.password,
        userType: body.userType,
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt update the User.',
    });
  }
};

export const deleteUser = async (req, res) => {
  const { idUser } = req.params;

  try {
    const data = await UserModel.findOneAndUpdate(
      { _id: idUser },
      { status: 'inactive' }
    );
    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this User.',
    });
  }
};
