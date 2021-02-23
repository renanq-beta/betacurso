import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnsToUsers1613986266461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "password_recovery",
            type: "varchar",
            isNullable: true
        }));
    
        await queryRunner.addColumn("users", new TableColumn({
            name: "actived",
            type: "varchar",
            isNullable: true
        }))        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "actived");
        await queryRunner.dropColumn("users", "password_recovery");
    }

}
