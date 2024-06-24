import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { genSalt, hash } from "bcrypt";
import { Document } from "mongoose";


@Schema()
export class User{

    @Prop({ unique: true , required: true })
    username: string

    @Prop({ unique: true , required: true })
    email: string

    @Prop({ required: true , select: false })
    password: string
}

export const userSchema = SchemaFactory.createForClass(User)

 userSchema.pre<User>('save', async function (next: Function){
     const salt = await genSalt(10)
    this.password = await hash(this.password, salt)
     next()
})
