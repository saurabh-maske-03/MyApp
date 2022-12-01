import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common'
import { TodoService } from '../service/todo.service'
import { CreateTodoDto } from '../model/dto/createTodo.dto'

@Controller('todo')
export class TodoController{

    constructor(private readonly todoService:TodoService){}

    @Post(":userId")
    create(@Body(ValidationPipe) createTodoDto: CreateTodoDto,@Param("userId")userId:number){
        return this.todoService.create(createTodoDto,Number(userId))
    }

    @Get('/finaAllPending/:userId')
    findAllPendingTodo(@Param("userId") userId:number){
        return this.todoService.findAllPendingTodo(Number(userId))
    }

    @Get('/finaAllCompleted/:userId')
    findAllCompletedTodo(@Param("userId") userId:number){
        return this.todoService.findAllCompletedTodo(Number(userId))
    }

    // @Patch(':id')
    // update(@Param('id') id:number){
    //     return this.todoService.updateTodo(Number(id))
    // }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.todoService.remove(Number(id))
    }
}