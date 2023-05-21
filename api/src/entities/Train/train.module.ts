import { Module } from '@nestjs/common';
import { TrainController } from './controller/train.controller';
import { TrainService } from './service/train.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrainEntity} from "./models/train.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TrainEntity])
    ],
    providers: [TrainService],
    controllers: [TrainController],
    exports: [TrainService],
})
export class TrainModule {}
