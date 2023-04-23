import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm";

let dataObj;

if(process.env.NODE_ENV === 'production'){
    dataObj = {
        url: '',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'timothy',
        password: 'plati442',
        database: 'devhub',
        entities: ['dist/**/*.entity.js'],
        synchronize:false,
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