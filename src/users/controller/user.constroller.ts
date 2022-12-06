import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../model/dto/CreateUser.dto';
import { LoginUserDto } from '../model/dto/LoginUser.dto';
import { UserI } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  
  @Post()
  create(@Body() createdUserDto: CreateUserDto): Observable<UserI> {
    return this.userService.create(createdUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Observable<Object> {
    return this.userService.login(loginUserDto).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000
        }
      })
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request): Observable<UserI[]> {
    return this.userService.findAll();
  }
  @Get()
  getAllUsers(){
    return this.userService.getAllUsers()
  }
}