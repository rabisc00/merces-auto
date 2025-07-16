import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  HasMany,
  Default,
} from 'sequelize-typescript';
import Place from './place';
import BusRouteTimetable from './busRouteTimetable';

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

  @ForeignKey(() => Place)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  originId!: string;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  destinationId!: string;

  @HasMany(() => BusRouteTimetable)
  busRouteTimetables!: BusRouteTimetable[];
}