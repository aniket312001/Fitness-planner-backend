const userModel = require('./users.model');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/jwt');
const AppError = require('../../exceptions/app.error');



exports.getAllUsers = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;

  return await userModel.getAllUsers({
    limit,
    offset,
    search,
  });
};