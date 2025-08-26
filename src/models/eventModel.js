const pool = require('../config/db');
const table = "events";



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

    async create({ name, date, description }) {
        const { rows } = await pool.query(
            `INSERT INTO ${table} (name, date, description)
            VALUES ($1, $2, $3)
            RETURNING *`, [name, date, description]
        );

        return rows[0];
    },

    async update(id, { name, date, description }) {
        const { rows } = await pool.query(
            `UPDATE ${table}
            SET name = COALESCE($2, name),
                date = COALESCE($3::date, date),
                description = COALESCE($4, description)
            WHERE id = $1
            RETURNING *`,
            [id, name ?? null, date ?? null, description ?? null]
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
    },

    async usersIntoEvent(eventId, { usersIds }) {
        const processedUsers = [];

        for (const userId of usersIds) {
            let result = await pool.query(
                `INSERT INTO events_users (event_id, user_id) VALUES ($1, $2)
                ON CONFLICT (event_id, user_id) DO NOTHING`,
                [eventId, userId]
            );

            if (result.rowCount === 0) {
                result = await pool.query(
                    `SELECT * FROM events_users
                WHERE event_id = $1 AND user_id = $2`,
                    [eventId, userId]
                );
                processedUsers.push({ ...result.rows[0], status: 'existing' });
            } else {
                processedUsers.push({ ...result.rows[0], status: 'inserted' });
            }
        }

        return processedUsers;

    },

    async getUsersFromEvent(eventId) {
        const { rows } = await pool.query(`
            SELECT users.id AS user_id,
            users.name AS username,
            events.name AS event_name
            FROM users
            JOIN events_users eu ON users.id = eu.user_id
            JOIN events ON events.id = eu.event_id
            WHERE events.id = $1
            `,
        [eventId])
        return rows
        ;
    }
};
