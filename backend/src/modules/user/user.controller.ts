import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post()
    create(@Body()dto:createUserDto){
        return this.userService.create(dto)
    }

    @Get()
    findAllUser(){
        return this.userService.findAll()
    }

    @Get(':id')
    findUser(@Param('id')id:string){
        return this.userService.findOne(id)
    }

   @Put(':id')
   updateUser(@Param('id')id:string,@Body()dto:updateUserDto){
    return  this.userService.update(id,dto)
   }

   @Delete('id')
   deleteUser(@Param('id')id:string){
    return this.userService.delete(id)
   }

}
