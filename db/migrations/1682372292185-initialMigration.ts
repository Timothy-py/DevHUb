import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1682372292185 implements MigrationInterface {
    name = 'InitialMigration1682372292185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "developer" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "level" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "developer"`);
    }

}
