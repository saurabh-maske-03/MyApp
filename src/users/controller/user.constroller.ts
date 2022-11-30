import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../model/dto/CreateUser.dto';
import { LoginUserDto } from '../model/dto/LoginUser.dto';
import { UserI } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  // Rest Call: POST http://localhost:8080/api/users/
  @Post()
  create(@Body() createdUserDto: CreateUserDto): Observable<UserI> {
    return this.userService.create(createdUserDto);
  }

  // Rest Call: POST http://localhost:8080/api/users/login
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

  // Rest Call: GET http://localhost:8080/api/users/ 
  // Requires Valid JWT from Login Request
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request): Observable<UserI[]> {
    return this.userService.findAll();
  }
}