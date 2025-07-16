import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasMany,
  BelongsTo,
  Default
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
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

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

  @ForeignKey(() => BusRoute)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  routeId!: string;

  @BelongsTo(() => BusRoute)
  busRoute!: BusRoute;

  @HasMany(() => Travel)
  travels!: Travel[];

  @HasMany(() => TimetableDay)
  timetableDays!: TimetableDay[];
}