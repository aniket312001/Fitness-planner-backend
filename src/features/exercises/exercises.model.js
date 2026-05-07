const pool = require('../../config/db');


exports.createExercise = async (name) => {
  const { rows } = await pool.query(
    `INSERT INTO exercises (name) VALUES ($1) RETURNING *`,
    [name]
  );
  return rows[0];
};

exports.getExercises = async () => {
  const { rows } = await pool.query(`SELECT * FROM exercises`);
  return rows;
};


exports.getExerciseById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM exercises WHERE id = $1`,
    [id]
  );
  return rows[0];
};


exports.updateExercise = async (id, name) => {
  const { rows } = await pool.query(
    `UPDATE exercises SET name = $1 WHERE id = $2 RETURNING *`,
    [name, id]
  );
  return rows[0];
};

exports.deleteExercise = async (id) => {
  await pool.query(`DELETE FROM exercises WHERE id = $1`, [id]);
};