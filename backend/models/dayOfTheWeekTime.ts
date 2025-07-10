import { Model, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BusTime } from "./routeTime";
import { DayOfTheWeek } from "./dayOfTheWeek";

@Table
export class DayOfTheWeekTime extends Model<DayOfTheWeekTime> {
    @ForeignKey(() => BusTime)
    @Column
    busTimeId!: number;

    @ForeignKey(() => DayOfTheWeek)
    @Column
    dateOfTheWeekId!: number;
}