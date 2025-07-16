import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Default,
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
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

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

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  driverId!: string;

  @ForeignKey(() => Bus)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  busId!: string;

  @ForeignKey(() => BusRouteTimetable)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  busRouteTimetableId!: string;
}