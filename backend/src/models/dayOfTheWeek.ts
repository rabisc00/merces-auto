import { Model, Table, Column, AutoIncrement, DataType, PrimaryKey, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { RouteTime } from './routeTime';
import { DayOfTheWeekTime } from './dayOfTheWeekTime';

@Table({ tableName: 'days_of_the_week' })
export class DayOfTheWeek extends Model<DayOfTheWeek> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @BelongsToMany(() => RouteTime, () => DayOfTheWeekTime)
    routeTimes!: RouteTime[];

    @Column(DataType.STRING)
    name!: string;
}