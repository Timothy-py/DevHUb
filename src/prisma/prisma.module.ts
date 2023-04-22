import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // make prisma service available to all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService]  //export prisma service to other providers
})
export class PrismaModule {}
