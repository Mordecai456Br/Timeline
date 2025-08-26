require('dotenv').config();
const {Pool} = require('pg')

const pool = new Pool ({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT) || 5432,
});

(async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        description TEXT
    );
    `);
})();

(async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    `);
})();

(async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS event_users (
        id SERIAL PRIMARY KEY,
        event_id INT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_event
            FOREING KEY (event_id) REFERENCES events(id)
            ON DELETE CASCADE,
        CONSTRAINT fk_user
            FOREING KEY (user_id) REFERENCES users(id)
            ON DELETE CASCADE
    );
    `);
})();

pool.connect().then(() => console.log("✅ Conectado ao PostgreSQL!"))
.catch(err => console.error("❌ Erro ao conectar:", err));

module.exports = pool;