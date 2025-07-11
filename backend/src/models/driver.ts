import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, NotNull, Unique, AllowNull } from "sequelize-typescript";

@Table({ tableName: 'driver' })
export class Driver extends Model<Driver> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @Unique
    @Column(DataType.STRING)
    documentNumber!: string;

    @Column(DataType.DATE)
    registrationDate!: Date;

    @Column(DataType.BOOLEAN)
    active!: boolean;

    @Column({
        allowNull: true,
        type: DataType.BLOB('long')
    })
    picture?: Buffer;
}