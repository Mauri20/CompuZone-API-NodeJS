import UserModel from './user.model';

export const getAllUsers = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const query = UserModel.find({}).skip(offset).limit(limit);

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

  if (!body) {
    return res.status(400).json({
      message: '> Please complete all fields required',
    });
  }
  try {
    const data = await UserModel.create({
      userName: body.userName,
      phone: body.phone,
      user: body.user,
      password: body.password,
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

export const updateUser = async (req, res) => {
  const { body, params } = req;
  const { idUser } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Please complete all fields required',
    });
  }

  try {
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

export const deleteUserPermantly = async (req, res) => {
  const { idUser } = req.params;

  try {
    const data = await UserModel.deleteOne({ _id: idUser });

    return res.status(200).json({
      ...data,
      status: 'deleted',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: '> It couldnt delete this User.',
    });
  }
};
