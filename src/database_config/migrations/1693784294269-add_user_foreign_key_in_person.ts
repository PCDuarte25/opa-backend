import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddUserForeignKeyInPerson1693784294269 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("person", new TableColumn({
      name: "user_id",
      type: "int",
      isNullable: false,
      isUnique: true,
    }));

    await queryRunner.createForeignKey("person", new TableForeignKey({
      columnNames: ["user_id"],
      referencedTableName: "user",
      referencedColumnNames: ["id"],
      name: "fk_person_user",
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("person", "fk_person_user");
    await queryRunner.dropColumn("person", "user_id");
  }

}
