import { MigrationInterface, QueryRunner } from "typeorm";

export class TableBill1700777768785 implements MigrationInterface {
    name = 'TableBill1700777768785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`responsibleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_0334fde937d4b567d8ad30c13e9\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_0334fde937d4b567d8ad30c13e9\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`responsibleId\``);
    }

}
