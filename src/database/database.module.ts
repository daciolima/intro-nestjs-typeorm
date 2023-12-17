import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/courses.entity';
import { Tag } from 'src/courses/tags.entity';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port:configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWD'),
                    database:configService.get('DB_NAME'),

                    // Entities envolvidas
                    entities: [Course, Tag],

                    // Observa as entities e cria automaticamente as tabelas/campos
                    synchronize: false,
                }
            },
            inject: [ConfigService]
        })
    ]

})
export class DatabaseModule {}
