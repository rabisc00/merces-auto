import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import TimetableDay from './timetableDay';

@Table({
  tableName: 'day_of_the_week',
  timestamps: true,
})
export default class DayOfTheWeek extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @HasMany(() => TimetableDay)
  timetableDays!: TimetableDay[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}