import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.constroller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}