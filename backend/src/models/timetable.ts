import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  Default,
  BelongsToMany,
  HasOne
} from 'sequelize-typescript';
import BusRoute from './busRoute';
import TimetableDay from './timetableDay';
import Trip from './trip';
import DayOfTheWeek from './dayOfTheWeek';

@Table({
  tableName: 'timetables',
  timestamps: true,
})
export default class Timetable extends Model {
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
    onDelete: 'CASCADE'
  })
  routeId!: string;

  @BelongsTo(() => BusRoute)
  busRoute!: BusRoute;

  @HasOne(() => Trip)
  trip!: Trip[];

  @BelongsToMany(() => DayOfTheWeek, () => TimetableDay)
  days!: DayOfTheWeek[];
}