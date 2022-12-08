import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../model/todo.entity';
import { AuthService } from '../../auth/services/auth/auth.service';
import { CreateTodoDto } from '../model/dto/createTodo.dto';
import { UserService } from '../../users/service/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  //create todos
  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo = new TodoEntity();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUser(userId);
    return this.todoRepository.save(todo);
  }

  //find all tods of specific user with completed = false

  findAllPendingTodo(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  //find all tods of specific user with completed = false

  findAllCompletedTodo(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  // mark todo as completed basedon todo ids

  updateTodo(todoId: number) {
    return this.todoRepository.save({id:todoId,completed: true});
  }

  // delete todo basedon todo id

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
