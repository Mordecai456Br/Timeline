const pool = require('../config/db');
const { findById } = require('./userModel');
const table = comments;

module.exports = {

    async findAll(){
        const { rows } = await pool.query(`
            SELECT * FROM ${table} ORDER BY id ASC`);
        return rows;
    },

    async findById(id){
        const { rows } = await pool.query(`
            SELECT * FROM ${table} ORDER BY id ASC
            WHERE id = $1  
            `, [id]);
        return rows[0];
    },
    
    async create({ comment, event_id, user_id }) {
        const { rows } = await pool.query(`
            INSERT INTO ${table} VALUES ($1, $2, $3)
            RETURNING *`, [comment, event_id, user_id]);
        return rows[0];
    },

    async update(id, { comment, event_id, user_id}) {
        const { rows } = await pool.query(`
            UPDATE ${table}
            SET comment = COALESCE ($2, comment),
                event_id = COALESCE ($3, event_id),
                user_id = COALESCE ($4, user_id)
            WHERE id = $1
            RETURNING *`,
        [id, comment ?? null, event_id ?? null, user_id ?? null]);
        return rows[0];
    },

    async remove(id){
        const { rows } = await pool.query(`
            DELETE FROM ${table} WHERE id = 1$
            RETURNING *`,
            [id]
        );
        return rows[0];
    }
}
