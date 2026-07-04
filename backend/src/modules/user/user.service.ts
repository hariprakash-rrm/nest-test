import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/userSchema';
import { createUserDto } from './dto/create-user.dto';
import {updateUserDto} from './dto/update-user.dto'

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<User>){

    }

    create(dto:createUserDto){
        return new this.userModel(dto).save()
    }

    findAll(){
        return this.userModel.find().exec()
    }

    findOne(id:string){
        return this.userModel.findById(id).exec()
    }
    update( id:string,dto:updateUserDto){
        return this.userModel.findByIdAndUpdate(id,dto,{new:true}).exec()
    }
    delete(id:string){
        return this.userModel.findByIdAndDelete(id).exec()
    }
}
