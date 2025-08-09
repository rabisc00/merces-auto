import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Default,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './user';

@Table({
  tableName: 'working_hours',
  timestamps: true,
})
export default class WorkingHours extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endTime!: Date;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  signature!: string;

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

  @BelongsTo(() => User)
  user!: User;
}