import { config } from 'dotenv';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.PMA_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          __dirname + '/../**/entities/*.entity{.ts,.js}',
          __dirname + '/../database_config/**/entity/*.entity{.ts,.js}',
        ],
        synchronize: true,
        logging: true,
      });
      return dataSource.initialize();
    },
  },
];
