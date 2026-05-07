const authService = require('./auth.service');
const asyncHandler = require('../../helpers/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.json({ success: true, data: user });
});

exports.login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);

  res.json({ success: true, ...data });
});