import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import Driver from './driver';
import Bus from './bus';
import BusRoute from './busRoute';
import BusRouteTimetable from './busRouteTimetable';

@Table({
  tableName: 'travel',
  timestamps: true,
})
export default class Travel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  driverId!: number;

  @ForeignKey(() => Bus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  busId!: number;

  @ForeignKey(() => BusRoute)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  busRouteId!: number;

  @ForeignKey(() => BusRouteTimetable)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  busRouteTimetableId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  numberOfPassengers!: number;

  @Column(DataType.TEXT)
  observations?: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}