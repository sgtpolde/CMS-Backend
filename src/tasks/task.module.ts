import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Module, forwardRef } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { Task } from './models/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { User } from 'src/users/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    CommonModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
