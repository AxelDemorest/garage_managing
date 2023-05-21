import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/entities/user/models/users.entity';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../entities/user/service/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByMail(email);
        if (user) {
            const passwordValid = await bcrypt.compare(password, user.password);
            if(passwordValid) return user;
        }
        return null;
    }

    async login(user: UsersEntity) {
        const payload = {
            email: user.mail,
            cp: user.cp,
            confirmed: user.confirmed,
            role: user.type,
            sub: user.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
