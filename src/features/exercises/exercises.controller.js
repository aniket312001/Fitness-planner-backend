const asyncHandler = require('../../helpers/asyncHandler');
const service = require('./exercises.service');

exports.create = asyncHandler(async (req, res) => {
  const data = await service.createExercise(req.body);
  res.json({ success: true, data });
});

exports.getAll = asyncHandler(async (req, res) => {
  const data = await service.getExercises();
  res.json({ success: true, data });
});

exports.getById = asyncHandler(async (req, res) => {
  const data = await service.getExerciseById(req.params.id);
  res.json({ success: true, data });
});

exports.update = asyncHandler(async (req, res) => {
  const data = await service.updateExercise(req.params.id, req.body);
  res.json({ success: true, data });
});

exports.delete = asyncHandler(async (req, res) => {
  await service.deleteExercise(req.params.id);
  res.json({ success: true });
});