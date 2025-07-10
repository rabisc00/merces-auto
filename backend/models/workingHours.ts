import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Driver } from "./driver";

@Table({ tableName: 'working_hours' })
export class WorkingHours extends Model<WorkingHours> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Driver)
    driverId!: number;

    @Column(DataType.DATEONLY)
    date!: string;

    @Column(DataType.DATE)
    startTime!: Date;

    @Column(DataType.DATE)
    endTime!: Date;

    @Column(DataType.INTEGER)
    totalTimeInHours!: number;

    @Column(DataType.BLOB('tiny'))
    signature!: Buffer;

    @BelongsTo(() => Driver)
    driver!: number;
}