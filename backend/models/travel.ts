import { AutoIncrement, Column, DataType, Model, PrimaryKey, BelongsTo, ForeignKey, Table } from "sequelize-typescript";
import { Driver } from "./driver";
import { Bus } from "./bus";
import { BusRoute } from "./busRoute";
import { BusTime } from "./routeTime";

@Table({ tableName: 'travels' })
export class Travel extends Model<Travel> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Driver)
    driverId!: number;

    @ForeignKey(() => Bus)
    busId!: number;

    @ForeignKey(() => BusRoute)
    busRouteId!: number;

    @ForeignKey(() => BusTime)
    busTimeId!: number;

    @Column(DataType.DATEONLY)
    date!: string;

    @Column(DataType.INTEGER)
    numberOfPassangers!: number;

    @Column(DataType.TEXT)
    observations!: string;

    @BelongsTo(() => Driver)
    driver!: Driver;

    @BelongsTo(() => Bus)
    bus!: Bus;

    @BelongsTo(() => BusRoute)
    busRoute!: BusRoute;

    @BelongsTo(() => BusTime)
    busTime!: BusTime;
}