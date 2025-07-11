import { Table, Model, Column, AutoIncrement, PrimaryKey, ForeignKey, DataType, BelongsToMany } from "sequelize-typescript"
import { BusRoute } from "./busRoute";
import { DayOfTheWeek } from "./dayOfTheWeek";
import { DayOfTheWeekTime } from "./dayOfTheWeekTime";

@Table({ tableName: 'route_times' })
export class RouteTime extends Model<RouteTime> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => BusRoute)
    @Column(DataType.INTEGER)
    routeId!: number;

    @BelongsToMany(() => DayOfTheWeek, () => DayOfTheWeekTime)
    dayOfTheWeekId!: DayOfTheWeek[];

    @Column(DataType.DATE)
    arrivalTime!: Date

    @Column(DataType.DATE)
    departureTime!: Date
};