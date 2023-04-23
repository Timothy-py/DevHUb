import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
    type: process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite',
    database: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'dev.sqlite',
    // entities: []
}