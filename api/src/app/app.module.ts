import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {TrainEntity} from "../entities/Train/models/train.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrainModule} from "../entities/Train/train.module";
import { ConfigModule } from '@nestjs/config';
import {ExcelModule} from "../entities/Excel/excel.module";
import {UsersEntity} from "../entities/User/models/users.entity";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../entities/User/users.module";

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
          type: 'mysql',
          url: process.env.CLEARDB_DATABASE_URL,
          entities: [
              TrainEntity,
              UsersEntity,
          ],
          synchronize: true,
      }),
      TrainModule,
      UsersModule,
      AuthModule,
      ExcelModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
