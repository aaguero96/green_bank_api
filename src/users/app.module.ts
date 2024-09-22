import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database.module';
import { UserControllerModule } from './controllers/user-controller.module';

@Module({
  imports: [DatabaseModule, UserControllerModule],
})
export class UserAppModule {}
