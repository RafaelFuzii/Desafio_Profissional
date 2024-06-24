import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: "NestJS",
            description: "Curso Sobre Fundamento do Framework",
            tags: ['node.js', 'nest.js', 'javascript']
        },
    ]

    findAll(){
        return this.courses
    }

    findOne(id: number){
        const course = this.courses.find(course => course.id === id)
        if (!course) {
            // throw new HttpException(`Course Id ${id} not found`, HttpStatus.NOT_FOUND) tem como tratar o erro desse jeito
            throw new NotFoundException(`Course Id ${id} not found`)
        }
        return course 
    }

    create(createCourseDTO: any){
        this.courses.push(createCourseDTO)
        return createCourseDTO
    }

    update(id: number, updateCourseDTO: any){
        const existCourse = this.findOne(id)

        if(existCourse as any) {
            const index = this.courses.findIndex(course => course.id === id)
            this.courses[index] = {
                id,
                ... updateCourseDTO,
            }
        }
    }

    remove(id: number){
        const index = this.courses.findIndex(course => course.id === id)
        if(index >= 0){
            this.courses.splice(index, 1)
        }
    }
}
