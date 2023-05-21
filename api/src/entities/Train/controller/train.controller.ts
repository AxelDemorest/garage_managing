import {Controller, Get, Post, Put, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {TrainService} from "../service/train.service";
import {TrainEntity} from "../models/train.entity";

/**
 * @import { Controller, Get, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
 * @import { FileFieldsInterceptor } from "@nestjs/platform-express";
 * @import { TrainService } from "../service/train.service";
 * @import { TrainEntity } from "../models/train.entity";
 * @description Controller for handling train-related HTTP requests.
 * @class
 */
@Controller('api/train')
export class TrainController {

    /**
     * @description Creates an instance of TrainController.
     * @constructor
     * @param {TrainService} trainService - The train service to be used for handling train-related logic.
     */
    constructor(private readonly trainService: TrainService) {}

    /**
     * @description Retrieves all train entities from the database.
     * @function
     * @async
     * @returns {Promise<TrainEntity[]>} - A promise that resolves to an array of train entities.
     */
    @Get('/')
    async getAllTrains(): Promise<TrainEntity[]> {
        return await this.trainService.findAll();
    }

    /**
     * @description Retrieves monthly statistics for trains from the database.
     * @function
     * @async
     * @param {string} start_date_str - The start date for the statistics query, as a string.
     * @param {string} end_date_str - The end date for the statistics query, as a string.
     * @returns {Promise<any>} - A promise that resolves to the monthly statistics.
     */
    @Get('/monthly/stats')
    async getMonthlyStats(
        @Query('start_date') start_date_str: string,
        @Query('end_date') end_date_str: string,
    ): Promise<any> {
        return await this.trainService.getMonthlyStats(start_date_str, end_date_str);
    }

    /**
     * @description Updates the time spent by each train in the station in the database.
     * @function
     * @async
     * @returns {Promise<string>} - A promise that resolves to a string message indicating the success of the update.
     */
    @Put('/temps-sous-gare')
    async updatePropertyTimeInStation(): Promise<string> {
        await this.trainService.updatePropertyTimeInStation();
        return 'Temps sous gare updated successfully.';
    }

    /**
     * @description Uploads Excel files to create new train entities in the database.
     * @function
     * @async
     * @param {any} files - The files to be uploaded.
     * @param {string} date - The date for the train entities, as a string.
     * @returns {Promise<any>} - A promise that resolves to an object containing a message and the result of the create operation.
     */
    @Post('/')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
    ]))
    async uploadFiles(@UploadedFiles() files, @Query('date') date: string) {
        const result = await this.trainService.create(files, date);
        return { message: 'Les fichiers Excel ont été traités avec succès', result };
    }

    /**
     * @description Retrieves all train entities for a given day from the database.
     * @function
     * @async
     * @param {string} date - The date for the trains to be retrieved, as a string.
     * @returns {Promise<any>} - A promise that resolves to the train entities for the given day.
     */
    @Get('/generate/day')
    async getTrainsOfOneDay(
        @Query('date') date: string,
    ): Promise<any> {
        return await this.trainService.getTrainsOfOneDay(date);
    }

    /**
     * @description Generates train entities for a date range and stores them in the database.
     * @function
     * @async
     * @param {string} start_date_str - The start date for the entities to be generated, as a string.
     * @param {string} end_date_str - The end date for the entities to be generated, as a string.
     * @returns {Promise<any>} - A promise that resolves to the generated train entities.
     */
    @Get('/generate-base')
    async generateBase(
        @Query('start_date') start_date_str: string,
        @Query('end_date') end_date_str: string,
    ): Promise<any> {
        const start_date = new Date(start_date_str);
        const end_date = new Date(end_date_str);

        return await this.trainService.generateBase(start_date, end_date);
    }
}
