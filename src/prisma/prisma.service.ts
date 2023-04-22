import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client connection to the DB
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // connect Prisma client to the database
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication){
        // close the app when prisma client is closed
        this.$on('beforeExit',async () => {
            await app.close();
        })
    }
}
