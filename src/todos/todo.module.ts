import { Module } from '@nestjs/common';
import { TodoService } from './service/todo.service';
import { TodoController } from './controller/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './model/todo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    AuthModule,
    UserModule
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}