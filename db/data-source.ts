import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm";

let dataObj;

if(process.env.NODE_ENV == 'production'){
    dataObj = {
        url: process.env.DATABASE_URL,
        type: 'postgres',
        entities: ['dist/**/*.entity.js'],
        synchronize:false,
        logging: true,
        migrations: ['dist/db/migrations/*.js']
    }
} else{
    dataObj = {
        type: 'sqlite',
        database: 'devhub.sql',
        synchronize: true
    }
}

export const dataSourceOptions: DataSourceOptions = dataObj

const dataSource = new DataSource(dataSourceOptions);

export default dataSource