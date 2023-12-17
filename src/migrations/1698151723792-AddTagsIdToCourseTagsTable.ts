import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddTagsIdToCourseTagsTable1698151723792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add column coursesId na tabela relação ManyToMany 'courses_tags' 
        await queryRunner.addColumn(

            'courses_tags_tags', 
            new TableColumn({

            name: 'tagsId', // Campo FK referenciando a tabelas Courses
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
            name: 'courses_tags_tags', 
            
            // Nome da coluna FK
            columnNames: ['tagsId'],
            
            // Tabela referenciada
            referencedTableName: 'tags',
            
            // Campo da babela referenciada
            referencedColumnNames:['id'],
            
            // O que deve ser feito em caso da exclução de um registro na tabela referenciada
            onDelete: 'SET NULL',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags_tags', 'courses_tags_tags')

        await queryRunner.dropColumn('courses_tags_tags', 'tagsId')
    }

}
