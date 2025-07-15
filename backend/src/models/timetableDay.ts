import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
  BelongsTo,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import BusRouteTimetable from './busRouteTimetable';
import DayOfTheWeek from './dayOfTheWeek';

@Table({
  tableName: 'timetable_days',
  timestamps: true
})
export default class TimetableDay extends Model {
  @ForeignKey(() => BusRouteTimetable)
  @Column(DataType.INTEGER)
  busRouteTimetableId!: number;

  @BelongsTo(() => BusRouteTimetable)
  busRouteTimetable!: BusRouteTimetable;

  @ForeignKey(() => DayOfTheWeek)
  @Column(DataType.INTEGER)
  dayOfTheWeekId!: number;

  @BelongsTo(() => DayOfTheWeek)
  dayOfTheWeek!: DayOfTheWeek;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}