const userService = require('./users.service');
const asyncHandler = require('../../helpers/asyncHandler');

exports.getClients = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || '';

  const result = await userService.getAllUsers({
    page,
    limit,
    search,
  });

  res.json({
    success: true,
    total: result.total,
    page,
    limit,
    data: result.users,
  });
});