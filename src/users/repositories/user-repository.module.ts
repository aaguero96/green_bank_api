import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entitities/user.entity';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY } from './user-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserRepositoryModule {}
