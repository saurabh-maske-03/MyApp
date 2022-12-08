import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe,UseGuards} from '@nestjs/common'
import { TodoService } from '../service/todo.service'
import { CreateTodoDto } from '../model/dto/createTodo.dto'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('todo')
export class TodoController{

    constructor(private readonly todoService:TodoService){}
    @UseGuards(JwtAuthGuard)
    @Post(":userId")
    create(@Body(ValidationPipe) createTodoDto: CreateTodoDto,@Param("userId")userId:number){
        return this.todoService.create(createTodoDto,Number(userId))
    }
    @UseGuards(JwtAuthGuard)
    @Get('/finaAllPending/:userId')
    findAllPendingTodo(@Param("userId") userId:number){
        return this.todoService.findAllPendingTodo(Number(userId))
    }

    @UseGuards(JwtAuthGuard)
    @Get('/finaAllCompleted/:userId')
    findAllCompletedTodo(@Param("userId") userId:number){
        return this.todoService.findAllCompletedTodo(Number(userId))
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id:number){
        return this.todoService.updateTodo(Number(id))
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id:number){
        return this.todoService.remove(Number(id))
    }
}