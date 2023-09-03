import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePerson1693613721709 implements MigrationInterface {
    name = 'CreatePerson1693613721709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`gender\` varchar(1) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`street\` varchar(70) NOT NULL, \`neighborhood\` varchar(70) NOT NULL, \`streetNumber\` varchar(6) NOT NULL, \`complement\` varchar(40) NOT NULL, \`city\` varchar(40) NOT NULL, \`state\` varchar(40) NOT NULL, \`cep\` varchar(8) NOT NULL, \`phoneNumber\` varchar(14) NOT NULL, \`birthDate\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`person\``);
    }

}
