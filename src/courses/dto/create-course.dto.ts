import { IsString } from "class-validator"

export class CreateCourseDTO {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsString({each: true}) // validadando cada array tem que ser string
    tags: string[]
}
