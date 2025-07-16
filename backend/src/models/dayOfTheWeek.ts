import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Default
} from 'sequelize-typescript';
import TimetableDay from './timetableDay';

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

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => TimetableDay)
  timetableDays!: TimetableDay[];
}