import { UserType } from '../users.entity';

export class UsersDto {
    id: number;
    cp: string;
    mail: string;
    firstName: string;
    lastName: string;
    type: UserType;
    password: string;
    confirmed: boolean;
}
