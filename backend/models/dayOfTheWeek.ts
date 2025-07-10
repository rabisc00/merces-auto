import { Model, Table, Column, AutoIncrement, DataType, PrimaryKey, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { BusTime } from './routeTime';
import { DayOfTheWeekTime } from './dayOfTheWeekTime';

@Table({ tableName: 'days_of_the_week' })
export class DayOfTheWeek extends Model<DayOfTheWeek> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @BelongsToMany(() => BusTime, () => DayOfTheWeekTime)
    busTimes!: BusTime[];

    @Column(DataType.STRING)
    name!: string;
}