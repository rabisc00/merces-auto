import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
  HasOne
} from 'sequelize-typescript';
import Driver from './driver';

@Table({
  tableName: 'users',
  timestamps: true
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @HasOne(() => Driver)
  driver?: Driver;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;

  @Default(true)
  @Column(DataType.BOOLEAN)
  active!: boolean;

  @Column(DataType.STRING)
  picture?: string;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;
}