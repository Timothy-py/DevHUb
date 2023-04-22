import { Module } from '@nestjs/common';
import { DeveloperModule } from './developer/developer.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DeveloperModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
