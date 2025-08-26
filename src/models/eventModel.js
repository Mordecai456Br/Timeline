const pool = require('../config/db');
const table = "events";


module.exports = { 

    async findAll () {
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

    async create({name, date, description}) {
        const {rows} = await pool.query(
            `INSERT INTO ${table} (name, date, description)
            VALUES (1$, 2$, $3)
            RETURNING *`, [name, date, description]
        );
        return rows[0];
    },

    async update (id, { name, date, description}) {
        const { rows } = await pool.query(
            `UPDADE ${table}
            SET name = COALESCE($2, name),
                date = COAOLESCE($3::date, date),
                description = COALESCE($4, description)
            WHERE id = $1
            RETURNING *`,
            [id, name ?? null, date ?? null, description ?? null]
        );
        return rows[0];
    },

    async remove (id) {
        const { rows } = await pool.query(
            `DELETE FROM ${table} WHERE id = $1
            RETURNING *`,
            [id]
        );
        return rows[0];
    }
 };