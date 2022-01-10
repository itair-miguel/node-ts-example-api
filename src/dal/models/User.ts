import { Column, PrimaryKey, Model } from "sequelize-typescript";

export interface User {
    id: string;
    name: string;
    password: string;
    salt: string;
    email: string;
}

export class UserModel extends Model implements User {
    @PrimaryKey
    public id: string;

    @Column
    public name: string;

    @Column
    public email: string;

    @Column
    public password: string;

    @Column
    public salt: string;
}
