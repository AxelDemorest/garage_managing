import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserType {
    ADMIN = 'Administrateur',
    USER = 'Utilisateur',
}

/**
 * Class representing a User.
 *
 * @export
 * @class User
 */
@Entity({ name: 'users' })
export class UsersEntity {
    /**
     * User's id, generated automatically by the database.
     *
     * @type {number}
     * @memberof User
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * User's sncf code.
     *
     * @type {string}
     * @memberof User
     */
    @Column()
    cp: string;

    /**
     * User's email.
     *
     * @type {string}
     * @memberof User
     */
    @Column()
    mail: string;

    /**
     * User's first name.
     *
     * @type {string}
     * @memberof User
     */
    @Column({ name: 'first_name'})
    firstName: string;

    /**
     * User's last name.
     *
     * @type {string}
     * @memberof User
     */
    @Column({ name: 'last_name' })
    lastName: string;

    /**
     * User's password.
     *
     * @type {string}
     * @memberof User
     */
    @Column()
    password: string;

    /**
     * User's type, with a default value of UserType.USER.
     *
     * @type {UserType}
     * @memberof User
     */
    @Column({ type: 'enum', enum: UserType, default: UserType.USER })
    type: UserType;

    @Column({ default: false })
    confirmed: boolean;
}
