import { Model, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { RouteTime } from "./routeTime";
import { DayOfTheWeek } from "./dayOfTheWeek";

@Table
export class DayOfTheWeekTime extends Model<DayOfTheWeekTime> {
    @ForeignKey(() => RouteTime)
    @Column
    routeTimeId!: number;

    @ForeignKey(() => DayOfTheWeek)
    @Column
    dateOfTheWeekId!: number;
}