const pool = require('../../config/db');

exports.createUser = async (name, email, password_hash, role) => {
  const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    name,
    email,
    password_hash,
    role,
  ]);

  return rows[0];
};

exports.findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return rows[0];
};

exports.getAllUsers = async ({ limit, offset, search }) => {
  const searchText = `%${search}%`;

  const usersQuery = `
    SELECT id, name, email, role
    FROM users
    WHERE role = 'client'
      AND (
        name ILIKE $1
        OR email ILIKE $1
      )
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  const countQuery = `
    SELECT COUNT(*) 
    FROM users
    WHERE role = 'client'
      AND (
        name ILIKE $1
        OR email ILIKE $1
      )
  `;

  const usersResult = await pool.query(usersQuery, [
    searchText,
    limit,
    offset,
  ]);

  const countResult = await pool.query(countQuery, [searchText]);

  return {
    users: usersResult.rows,
    total: Number(countResult.rows[0].count),
  };
};