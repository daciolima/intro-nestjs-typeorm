import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddCoursesIdToCourseTagsTable1698148107913 implements MigrationInterface {

    // Adicionando um campo em tabelas ja existentes e criar relacionamento FK
    public async up(queryRunner: QueryRunner): Promise<void> {

        // Add column coursesId na tabela relação ManyToMany 'courses_tags' 
        await queryRunner.addColumn(
            'courses_tags_tags', 
            new TableColumn({

            name: 'coursesId', // Campo FK referenciando a tabelas Courses
            type: 'uuid',
            isNullable: true,
            }),
        )

        // Criando uma conexão FK entre o campo e a tabela
        await queryRunner.createForeignKey(
            // Tabela a receber o campo(courses_tags) que será FK.
            'courses_tags_tags', new TableForeignKey({
            
                // Nome da relação FK. 
            // courses_tags => courses
            name: 'courses_tags_courses', 
            
            // Nome da coluna FK
            columnNames: ['coursesId'],
            
            // Tabela referenciada
            referencedTableName: 'courses',
            
            // Campo da babela referenciada
            referencedColumnNames:['id'],
            
            // O que deve ser feito em caso da exclução de um registro na tabela referenciada
            onDelete: 'SET NULL',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags_tags', 'courses_tags_courses')

        await queryRunner.dropColumn('courses_tags_tags', 'coursesId')
    }

}
