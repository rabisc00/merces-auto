import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import Place from './place';
import BusRouteTimetable from './busRouteTimetable';

@Table({
  tableName: 'bus_routes',
  timestamps: true,
})
export default class BusRoute extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  originId!: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  destinationId!: number;

  @HasMany(() => BusRouteTimetable)
  busRouteTimetables!: BusRouteTimetable[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lineNumber!: string;

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
}