import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersDto} from '../models/dto/users.dto';
import {UsersEntity} from '../models/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>,
    ) {
    }

    async create(user: UsersDto): Promise<UsersEntity> {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const createUser = this.usersRepository.create(user);
        await this.usersRepository.save(createUser);
        return createUser;
    }

    async find(): Promise<UsersEntity[]> {
        return this.usersRepository.find();
    }

    async findById(id: number): Promise<UsersEntity> {
        return await this.usersRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findByMail(mail: string): Promise<UsersEntity> {
        return await this.usersRepository.findOne({
            where: {
                mail: mail,
            }
        });
    }

    async delete(id: string) {
        return await this.usersRepository
            .createQueryBuilder()
            .delete()
            .from(UsersEntity)
            .where('id = :id', { id })
            .execute();
    }

    async changePassword(id: string, password: string) {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        return await this.usersRepository
            .createQueryBuilder()
            .update(UsersEntity)
            .set({ password: password, confirmed: true })
            .where('id = :id', { id })
            .execute();
    }
}
