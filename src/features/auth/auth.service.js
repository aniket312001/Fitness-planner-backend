const userModel = require('../users/users.model');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/jwt');
const AppError = require('../../exceptions/app.error');

exports.register = async (data) => {
  const existing = await userModel.findUserByEmail(data.email);
  if (existing) throw new AppError('User already exists', 400);

  const hashed = await hashPassword(data.password);

  const user = await userModel.createUser(
    data.name,
    data.email,
    hashed,
    data.role 
  );

  const token = generateToken({
    id: user.id,
    role: user.role,
  });
  
  return { user, token };
};

exports.login = async (data) => {
  const user = await userModel.findUserByEmail(data.email);
  if (!user) throw new AppError('User not found', 404);

  const isMatch = await comparePassword(data.password, user.password_hash);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return { user, token };
};