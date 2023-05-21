import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./models/users.entity";
import {UsersService} from "./service/users.service";
import {UserController} from "./controller/users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity])
    ],
    providers: [UsersService],
    controllers: [UserController],
    exports: [UsersService],
})
export class UsersModule {}
