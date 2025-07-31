import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Default,
  BelongsToMany
} from 'sequelize-typescript';
import TimetableDay from './timetableDay';
import Timetable from './timetable';
import { INTEGER } from 'sequelize';

@Table({
  tableName: 'day_of_the_week',
  timestamps: true,
})
export default class DayOfTheWeek extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: INTEGER,
    allowNull: false
  })
  dayId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => Timetable, () => TimetableDay)
  timetables!: Timetable[];
}