import { HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDTO } from './dto/user.dto';
import * as bcrypt from "bcrypt";
import { UpdateUser } from './dto/updateUser.dto';



@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser(createUserDTO: CreateUserDTO) {
        const newUser = new this.userModel(createUserDTO)
        return newUser.save()
    }

    async findAll(){
        const user = await this.userModel.find()
        return user
    }

    async findOne (username: string): Promise<any>{
        const user = await this.userModel.findOne({ username: username}).select('+password')

        return user
    }

    async updateUser(id: string, user: UpdateUser){
        const update = await this.userModel.findByIdAndUpdate(id,{
            username: user.username,
            email: user.email,
            password: await bcrypt.hash(user.password, 10)
        }, {new: true}) 
        
        return update
    }

    async deleteUser(id: string){
        const deletedUser = await this.userModel.findByIdAndDelete(id)
        return deletedUser
    }

}
