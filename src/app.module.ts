import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DeveloperModule } from './developer/developer.module';
import configuration from './config/configuration';

@Module({
  imports: [
    DeveloperModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
