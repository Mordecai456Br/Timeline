const pool = require('../config/db')
const table = users;

module.exports = {

    async findAll() {
        const { rows } = await pool.query(
            `SELECT * FROM ${table} ORDER BY id ASC`
        );
        return rows;
    },

    async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM ${table} WHERE id = $1`, [id]
        );
        return rows[0];
    },

    async create({ name}) {
        const { rows } = await pool.query(
            `INSERT INTO ${table} (name)
            VALUES ($1)
            RETURNING *`, [name]
        );
        return rows[0];
    },

    async update(id, { name}) {
        const { rows } = await pool.query(
            `UPDATE ${table}
            SET name = COALESCE($2, name),
            WHERE id = $1
            RETURNING *`,
            [id, name ?? null]
        );
        return rows[0];
    },

    async remove(id) {
        const { rows } = await pool.query(
            `DELETE FROM ${table} WHERE id = $1
            RETURNING *`,
            [id]
        );
        return rows[0];
    }
}