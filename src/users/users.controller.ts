import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateUser } from './dto/updateUser.dto';
import { FindAllException } from './exeption/findAll.exeption';
import { LoggingInterceptor } from 'src/logger/logger.interceptor';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Public()
    @Post('register')
    async createUser(@Body() createUserDTO: CreateUserDTO){
        const user = await this.userService.createUser(createUserDTO)
        return new HttpException('User Created', HttpStatus.CREATED)
    }

    
    @Get()
    async findAll(){
        const findAllUser = await this.userService.findAll()
        throw new FindAllException()
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUser){
        const update = await this.userService.updateUser(id,updateUser)
        return new HttpException('User updated',HttpStatus.OK)
    }

    @Delete('delete/:id')
    async Delete(@Param('id') id: string){
        const deleteUser = await this.userService.deleteUser(id)
        return new HttpException('User deleted', HttpStatus.NO_CONTENT)
    }
}
 