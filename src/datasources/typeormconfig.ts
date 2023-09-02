import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.PMA_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.PMA_HOST,
    entities: [
        "dist/database_config/**/entity/*.entity{.ts,.js}",
        "src/database_config/**/entity/*.entity{.ts,.js}"
    ],
    migrations: [
        'src/database_config/migrations/*.ts'
    ],
    migrationsTableName: 'typeorm_migrations_entities',
    synchronize: false,
    logging: true,
});