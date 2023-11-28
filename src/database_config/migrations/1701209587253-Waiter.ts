import { MigrationInterface, QueryRunner } from "typeorm";

export class Waiter1701209587253 implements MigrationInterface {
    name = 'Waiter1701209587253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`table\` ADD \`waiterId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`table\` ADD CONSTRAINT \`FK_4cdd0e73b6298422d054ab6daff\` FOREIGN KEY (\`waiterId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`table\` DROP FOREIGN KEY \`FK_4cdd0e73b6298422d054ab6daff\``);
        await queryRunner.query(`ALTER TABLE \`table\` DROP COLUMN \`waiterId\``);
    }

}
