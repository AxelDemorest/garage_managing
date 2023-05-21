import { Module } from '@nestjs/common';
import { ExcelController } from './controller/excel.controller';

@Module({
    controllers: [ExcelController],
})
export class ExcelModule {}
