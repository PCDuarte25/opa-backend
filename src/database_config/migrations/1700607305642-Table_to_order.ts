import { MigrationInterface, QueryRunner } from "typeorm";

export class TableToOrder1700607305642 implements MigrationInterface {
    name = 'TableToOrder1700607305642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_5157fa65538cae06e66c922c898\``);
        await queryRunner.query(`DROP INDEX \`IDX_5157fa65538cae06e66c922c89\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD UNIQUE INDEX \`IDX_5157fa65538cae06e66c922c89\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`tableId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`street\` \`street\` varchar(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`neighborhood\` \`neighborhood\` varchar(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`streetNumber\` \`streetNumber\` varchar(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`complement\` \`complement\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`city\` \`city\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`state\` \`state\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`cep\` \`cep\` varchar(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`birthDate\` \`birthDate\` date NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_5157fa65538cae06e66c922c898\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a9757413db9333d4bb21a2a42aa\` FOREIGN KEY (\`tableId\`) REFERENCES \`table\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a9757413db9333d4bb21a2a42aa\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_5157fa65538cae06e66c922c898\``);
        await queryRunner.query(`DROP INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`birthDate\` \`birthDate\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`cep\` \`cep\` varchar(8) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`state\` \`state\` varchar(40) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`city\` \`city\` varchar(40) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`complement\` \`complement\` varchar(40) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`streetNumber\` \`streetNumber\` varchar(6) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`neighborhood\` \`neighborhood\` varchar(70) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`street\` \`street\` varchar(70) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`tableId\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP INDEX \`IDX_5157fa65538cae06e66c922c89\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5157fa65538cae06e66c922c89\` ON \`person\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_5157fa65538cae06e66c922c898\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
