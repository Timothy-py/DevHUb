import { Logger, Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DeveloperController],
  providers: [DeveloperService, Logger]
})
export class DeveloperModule {}
