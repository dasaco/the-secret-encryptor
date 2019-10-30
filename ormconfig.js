const dotenv = require('dotenv');

dotenv.config();

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  synchronize: true,
  logging: false,
  entities: ['dist/db/entities/**/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations/**/*.ts',
    entitiesDir: 'dist/db/entities/**/*.js',
  },
};

module.exports = config;
