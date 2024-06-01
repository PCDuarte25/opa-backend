import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.PMA_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        "src/**/entities/*.entity{.ts,.js}"
    ],
    migrations: [
        'src/database_config/migrations/*.ts'
    ],
    migrationsTableName: 'typeorm_migrations_entities',
    synchronize: false,
    logging: true,
});