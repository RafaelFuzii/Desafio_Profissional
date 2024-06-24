import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class UpdateUser{
    @IsString()
    username: string

    @IsEmail()
    email: string

    @MinLength(6)
    password?: string
}