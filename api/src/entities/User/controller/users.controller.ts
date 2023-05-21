import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus, Get, Param, Delete,
} from '@nestjs/common';
import { UsersDto } from '../models/dto/users.dto';
import { UsersEntity } from '../models/users.entity';
import { UsersService } from '../service/users.service';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Post('/')
    async create(@Res() res, @Body() user: UsersDto) {
        const newUser = await this.userService.create(user);
        return res.status(HttpStatus.OK).json({
            message: 'User has been submitted successfully!',
            post: newUser,
        });
    }

    @Get('/')
    async find() {
        return this.userService.find();
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        return this.userService.findById(parseInt(id, 10));
    }

    @Get('/:mail')
    async findByMail(@Param('mail') mail: string) {
        return this.userService.findByMail(mail);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    @Post('/:id/change-password')
    async changePassword(@Param('id') id: string, @Body() user: UsersDto) {
        return this.userService.changePassword(id, user.password);
    }
}
