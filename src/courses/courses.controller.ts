import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UptdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService){}

    @Get()
    findAll(){
        return this.courseService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number, @Param('name') name: String){
        return this.courseService.findOne(id)
    }

    @Post()
    create(@Body() createcourseDTO: CreateCourseDTO){   
        return this.courseService.create(createcourseDTO)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCourseDTO: UptdateCourseDTO){
        return this.courseService.update(id, updateCourseDTO)
    }

    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.courseService.remove(id)
    }
}
