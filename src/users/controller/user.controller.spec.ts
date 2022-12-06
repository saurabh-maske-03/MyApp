import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.constroller';
import {UserService} from '../service/user.service'
import {UserEntity} from "../model/user.entity"


describe('UserController', () => {
  let controller: UserController;
  let service : UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
    service= module.get<UserService>(UserService);
  });
  // describe("getAllUsers",()=>{
  //   it('should return array of objects of users',async ()=>{
  //     let data= [{id:1,name:"saurabh",email:'nomail@gmail.com'}]
  //  // jest.spyOn(service,'getAllUsers').mockImplementation(()=>data );
  //     expect(await controller.getAllUsers()).toBe(data)
  // })
  // })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
 });