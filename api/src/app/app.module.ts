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
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
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
