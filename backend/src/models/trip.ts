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
  BelongsTo,
} from 'sequelize-typescript';
import Driver from './driver';
import Bus from './bus';
import Timetable from './timetable';

@Table({
  tableName: 'trip',
  timestamps: true,
})
export default class Trip extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

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

  @ForeignKey(() => Timetable)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  timetableId!: string;

  @BelongsTo(() => Timetable)
  timetable: Timetable;
}