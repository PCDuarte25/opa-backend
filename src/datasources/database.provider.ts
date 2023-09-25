import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.PMA_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_ROOT_PASSWORD,
                database: process.env.PMA_HOST,
                entities: [
                    __dirname + '/../database_config/**/entity/*.entity{.ts,.js}',
                ],
                synchronize: true,
                logging: true,
            });
            return dataSource.initialize();
        },
    },
];
