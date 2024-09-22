import { Module } from '@nestjs/common';
import { UserAppModule } from './users/app.module';

@Module({
  imports: [UserAppModule],
})
export class AppModule {}
