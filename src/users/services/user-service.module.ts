import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repositories/user-repository.module';
import { USER_SERVICE } from './user-service.interface';
import { UserService } from './user.service';

@Module({
  imports: [UserRepositoryModule],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [USER_SERVICE],
})
export class UserServiceModule {}
