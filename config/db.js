const sqlConfig = {
    user: 'sa',
    password: '1',
    database: 'pck_bus_travel',
    server: 'localhost',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

module.exports = sqlConfig;