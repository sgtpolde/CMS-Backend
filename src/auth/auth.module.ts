import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/roles/role.module';
import { CommonModule } from 'src/common/common.module';
import { TaskModule } from 'src/tasks/task.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    RoleModule,
    CommonModule,
    forwardRef(() => TaskModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
