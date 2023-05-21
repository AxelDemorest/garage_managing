import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'mail',
            passwordField: 'password',
        });
    }

    async validate(mail: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(mail, password);
        if (!user) {
            throw new UnauthorizedException('Email or password is incorrect');
        }
        return user;
    }
}
