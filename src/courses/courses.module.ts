import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './courses.entity';
import { Tag } from './tags.entity';

@Module({

    // Import de Entity a ser gerenciada pelo corrente modulo
    imports: [TypeOrmModule.forFeature([Course, Tag])],
    
    controllers:[CoursesController],
    providers: [CoursesService],

    // Exporta serviço expecífico para outros módulos
    // exports:[CoursesService]
})
export class CoursesModule {}
