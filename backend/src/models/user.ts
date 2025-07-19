import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
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
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    unique: true,
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  password!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;
  
  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasOne(() => Driver, {
    onDelete: 'CASCADE'
  })
  driver?: Driver;
}