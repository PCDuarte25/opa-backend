import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1695424115911 implements MigrationInterface {
    name = 'CreateEntities1695424115911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_item\` DROP FOREIGN KEY \`FK_25f141d1fce6267602f9b9f9621\``);
        await queryRunner.query(`DROP INDEX \`IDX_5157fa65538cae06e66c922c89\` ON \`person\``);
        await queryRunner.query(`CREATE TABLE \`stock\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productDescription\` varchar(100) NOT NULL, \`stockQuantity\` decimal NOT NULL, \`measurementUnit\` enum ('UN', 'G', 'KG') NOT NULL DEFAULT 'G', UNIQUE INDEX \`IDX_898d9ee0ec1474f019a1f74667\` (\`productDescription\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_item\` ADD CONSTRAINT \`FK_25f141d1fce6267602f9b9f9621\` FOREIGN KEY (\`stockId\`) REFERENCES \`stock\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_item\` DROP FOREIGN KEY \`FK_25f141d1fce6267602f9b9f9621\``);
        await queryRunner.query(`DROP INDEX \`IDX_898d9ee0ec1474f019a1f74667\` ON \`stock\``);
        await queryRunner.query(`DROP TABLE \`stock\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5157fa65538cae06e66c922c89\` ON \`person\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`product_item\` ADD CONSTRAINT \`FK_25f141d1fce6267602f9b9f9621\` FOREIGN KEY (\`stockId\`) REFERENCES \`estoque\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
