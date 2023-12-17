import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCoursesTable1698064114056 implements MigrationInterface {

    // É executado quando roda via shell o comando: typeorm migration:run 
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name: 'courses',
            columns:[
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: 'CURRENT_TIMESTAMP'
                },
            ]
        }))
    }

    // É executado quando roda via shell o comando: typeorm migration:revert
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses');
    }
}

