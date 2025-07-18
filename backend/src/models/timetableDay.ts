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
import Timetable from './timetable';
import DayOfTheWeek from './dayOfTheWeek';

@Table({
  tableName: 'timetable_days',
  timestamps: true
})
export default class TimetableDay extends Model {
  @ForeignKey(() => Timetable)
  @Column(DataType.UUID)
  timetableId!: number;

  @BelongsTo(() => Timetable)
  timetable!: Timetable;

  @ForeignKey(() => DayOfTheWeek)
  @Column(DataType.UUID)
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