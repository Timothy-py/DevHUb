import * as dotenv from 'dotenv'
dotenv.config()
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import {dataSourceOptions} from '../db/data-source'
import { DeveloperModule } from './developer/developer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    DeveloperModule
  ],
  providers: [Logger]
})


export class AppModule {}
