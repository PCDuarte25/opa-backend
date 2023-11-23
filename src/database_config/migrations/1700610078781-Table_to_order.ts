import { MigrationInterface, QueryRunner } from "typeorm";

export class TableToOrder1700610078781 implements MigrationInterface {
    name = 'TableToOrder1700610078781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_5157fa65538cae06e66c922c898\``);
        await queryRunner.query(`DROP INDEX \`IDX_5157fa65538cae06e66c922c89\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\``);
        await queryRunner.query(`CREATE TABLE \`bill\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_people_person\` (\`orderId\` int NOT NULL, \`personId\` int NOT NULL, INDEX \`IDX_aea79640a7e582ac02e376dac9\` (\`orderId\`), INDEX \`IDX_e54fc8d48c143415e3fe9605e8\` (\`personId\`), PRIMARY KEY (\`orderId\`, \`personId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`billId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`status\` enum ('1', '2', '3') NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_88991860e839c6153a7ec878d39\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_bbd901ebff961f31c6038c4e2ad\` FOREIGN KEY (\`billId\`) REFERENCES \`bill\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_people_person\` ADD CONSTRAINT \`FK_aea79640a7e582ac02e376dac93\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_people_person\` ADD CONSTRAINT \`FK_e54fc8d48c143415e3fe9605e84\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_people_person\` DROP FOREIGN KEY \`FK_e54fc8d48c143415e3fe9605e84\``);
        await queryRunner.query(`ALTER TABLE \`order_people_person\` DROP FOREIGN KEY \`FK_aea79640a7e582ac02e376dac93\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_bbd901ebff961f31c6038c4e2ad\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_88991860e839c6153a7ec878d39\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'Pending'`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`billId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_e54fc8d48c143415e3fe9605e8\` ON \`order_people_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_aea79640a7e582ac02e376dac9\` ON \`order_people_person\``);
        await queryRunner.query(`DROP TABLE \`order_people_person\``);
        await queryRunner.query(`DROP TABLE \`bill\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5157fa65538cae06e66c922c89\` ON \`person\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_5157fa65538cae06e66c922c898\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
