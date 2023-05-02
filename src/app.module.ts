import * as dotenv from 'dotenv'
dotenv.config()
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';  
import {dataSourceOptions} from '../db/data-source'
import { DeveloperModule } from './developer/developer.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redis from 'redis';
import * as redisStore from 'cache-manager-redis';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    DeveloperModule,
    CacheModule.register({
      store: redisStore,
      client: redisClient,
      // url: process.env.REDIS_URL,
      isGlobal: true,
      ttl: 60,
      max: 100
    })
  ],
  providers: [Logger]
})


export class AppModule {}
