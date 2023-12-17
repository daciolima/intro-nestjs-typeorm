import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1698064114056 } from "src/migrations/1698064114056-CreateCoursesTable";
import { CreateTagsTable1698079527168 } from "src/migrations/1698079527168-CreateTagsTable";
import { CreateCoursesTagsTable1698087026694 } from "src/migrations/1698087026694-CreateCoursesTagsTable";
import { AddCoursesIdToCourseTagsTable1698148107913 } from "src/migrations/1698148107913-AddCoursesIdToCourseTagsTable";
import { AddTagsIdToCourseTagsTable1698151723792 } from "src/migrations/1698151723792-AddTagsIdToCourseTagsTable";
import { Course } from "src/courses/courses.entity";
import { Tag } from "src/courses/tags.entity";


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_POST),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,

    // Entities envolvidas
    entities: [Course, Tag],

    // Observa as entities e cria automaticamente as tabelas/campos
    synchronize: false
}

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1698064114056, CreateTagsTable1698079527168, CreateCoursesTagsTable1698087026694, AddCoursesIdToCourseTagsTable1698148107913,
        AddTagsIdToCourseTagsTable1698151723792]
})