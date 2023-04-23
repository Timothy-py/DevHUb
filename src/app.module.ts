import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperModule } from './developer/developer.module';
import { dataSourceOptions } from 'db/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true
    }),
    DeveloperModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
