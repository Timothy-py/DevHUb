export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
    database: {
        type: process.env.DB_PROVIDER || 'sqlite',
        url: process.env.DB_URL || 'file:./dev.db',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || 'devhub',
        password: process.env.DB_PASSWORD || 'devhub',
        database: process.env.DB_NAME || 'devhub'
     }
})