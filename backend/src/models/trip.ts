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
  HasOne,
} from 'sequelize-typescript';
import Bus from './bus';
import Timetable from './timetable';
import User from './user';

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

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

  @BelongsTo(() => Bus)
  bus!: Bus;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Timetable)
  timetable: Timetable;
}