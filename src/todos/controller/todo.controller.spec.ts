import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from '../service/todo.service';
import { UserService } from '../../users/service/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
describe('todoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;
  let userService: UserService;

  jest.useFakeTimers();
  jest.setSystemTime(new Date('2020-02-19'));
  const date = new Date();

  const mockTodoService = {
    create: jest.fn().mockImplementation((title, userId) => {
      return {
        title: 'awsome title',
        date: date,
        completed: false,
        user: {
          id: 4,
          name: 'Alex',
          email: 'alex@gmail.com',
        },
        id: 1,
      };
    }),
    findAllPendingTodo: jest.fn().mockImplementation((userId) => {
      return [
        {
          title: 'awsome title',
          date: date,
          completed: false,
          user: {
            id: 4,
            name: 'Alex',
            email: 'alex@gmail.com',
          },
          id: 1,
        },
      ];
    }),
    findAllCompletedTodo: jest.fn().mockImplementation((userId) => {
      return [
        {
          title: 'awsome title',
          date: date,
          completed: false,
          user: {
            id: 4,
            name: 'Alex',
            email: 'alex@gmail.com',
          },
          id: 1,
        },
      ];
    }),
    updateTodo: jest.fn().mockImplementation((todoId) => {
      return {
        id: 1,
        completed: true,
      };
    }),

    remove: jest.fn().mockImplementation((todoId) => {
      return {
        raw: [],
        affected: 1,
      };
    }),
  };
  const mockUserService = {};
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        { provide: UserService, useValue: mockUserService },
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(TodoService)
      .useValue(mockTodoService)
      .compile();
    todoService = moduleRef.get<TodoService>(TodoService);
    userService = moduleRef.get<UserService>(UserService);
    todoController = moduleRef.get<TodoController>(TodoController);
  });
  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  it('should create todo for loggedin user', () => {
    expect(todoController.create({ title: 'Myawsome title' }, 1)).toEqual({
      title: expect.any(String),
      date: date,
      completed: false,
      user: {
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
      },
      id: expect.any(Number),
    });
  });

  it('fetch all pending todos of loggedin user ', () => {
    expect(todoController.findAllPendingTodo(3)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          date: date,
          completed: false,
          user: {
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
          },
        }),
      ]),
    );
  });

  it('fetch all completed todos of loggedin user ', () => {
    expect(todoController.findAllCompletedTodo(3)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          date: date,
          completed: false,
          user: {
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
          },
        }),
      ]),
    );
  });

  it('update todo as completed based on todoId', () => {
    expect(todoController.update(1)).toEqual({
      id: expect.any(Number),
      completed: true,
    });
  });

  it('remove todo based on todo id', () => {
    expect(todoController.remove(1)).toEqual({
      raw: [],
      affected: expect.any(Number),
    });
  });
});
