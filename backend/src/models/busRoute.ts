import { RouteTime } from './routeTime';
import { Table, Model, Column, NotNull, AutoIncrement, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';

@Table({ tableName: "bus_routes" })
export class BusRoute extends Model<BusRoute> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @HasMany(() => RouteTime)
    times!: RouteTime[];

    @Column(DataType.STRING)
    lineNumber!: string;

    @Column(DataType.STRING)
    origin!: string;

    @Column(DataType.STRING)
    destination!: string;

    @Column(DataType.DOUBLE)
    distance!: number;

    @Column(DataType.INTEGER)
    averageTimeInMinutes!: number
}