import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  HasMany,
  Default,
} from 'sequelize-typescript';
import Timetable from './timetable';

@Table({
  tableName: 'bus_routes',
  timestamps: true,
})
export default class BusRoute extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lineNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  origin!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  destination!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  distanceInKm!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  averageTimeInMinutes!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => Timetable)
  timetables!: Timetable[];
}