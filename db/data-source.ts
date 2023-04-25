import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm";

let dataObj;

if(process.env.NODE_ENV == 'production'){
    dataObj = {
        url: process.env.DATABASE_URL,
        type: process.env.DATABASE_TYPE,
        synchronize:true,
        logging: ["error", "warn"],
        entities: ['dist/src/**/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
        cli: {
            migrationsDir: 'src/db/migrations'
        }
    }
} else{
    dataObj = {
        type: 'sqlite',
        database: 'devhub.sql',
        synchronize: true,
        entities: ['dist/src/**/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
        cli: {
            migrationsDir: 'src/db/migrations'
        }
    }
}

export const dataSourceOptions: DataSourceOptions = dataObj

const dataSource = new DataSource(dataSourceOptions);

export default dataSource