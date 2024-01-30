import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO, UpdateCourseDTO } from './courses.dto';
import { Roles } from 'nest-keycloak-connect';


@Controller('courses')
@Roles({roles: ['dev']})
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    async findAll(@Res() res: any) {

       const listCourses = await this.coursesService.findAll()
       const count = listCourses.length
       return res.status(200).json({"counts": count, "results": listCourses})
    }

    // @Get(':id/:name')
    // findOne(@Param('id') id: string, @Param('name') name: string) {
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createCourseDTO: CreateCourseDTO) {
        return this.coursesService.create(createCourseDTO)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO) {
        return this.coursesService.update(id, updateCourseDTO)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coursesService.remove(id)
    }
}
