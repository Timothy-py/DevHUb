import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';

@Module({
  controllers: [DeveloperController],
  providers: [DeveloperService]
})
export class DeveloperModule {}
