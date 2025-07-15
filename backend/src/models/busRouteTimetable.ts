import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';
import BusRoute from './busRoute';
import TimetableDay from './timetableDay';
import Travel from './travel';

@Table({
  tableName: 'bus_route_timetable',
  timestamps: true,
})
export default class BusRouteTimetable extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => BusRoute)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  routeId!: number;

  @BelongsTo(() => BusRoute)
  busRoute!: BusRoute;

  @HasMany(() => Travel)
  travels!: Travel[];

  @HasMany(() => TimetableDay)
  timetableDays!: TimetableDay[];

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  arrivalTime!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  departureTime!: Date;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}