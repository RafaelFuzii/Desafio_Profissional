import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    username: string
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string
}