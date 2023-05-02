import * as dotenv from 'dotenv';
dotenv.config();
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { DeveloperModule } from './developer/developer.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
// import { redisStore } from 'cache-manager-redis-store';

const REDIS_URL = process.env.REDIS_URL;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    DeveloperModule,
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      ttl: 1000,
      max: 100,
      store: `${redisStore}`,
      url: REDIS_URL,
    }),
  ],
  providers: [Logger],
})
export class AppModule {}
