import { Column, PrimaryKey, Model, DataType } from "sequelize-typescript";

export interface Example {
    id: string;
    title: string;
    comment: string;
}

export class ExampleModel extends Model implements Example {

    @PrimaryKey
    public id: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    public title: string;

    @Column({ type: DataType.STRING(300) })
    public comment: string;

}
