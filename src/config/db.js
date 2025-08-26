require('dotenv').config();
const {Pool} = require('pg')

const pool = new Pool ({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT) || 5432,
});

pool.connect().then(() => console.log("✅ Conectado ao PostgreSQL!"))
.catch(err => console.error("❌ Erro ao conectar:", err));

module.exports = pool;