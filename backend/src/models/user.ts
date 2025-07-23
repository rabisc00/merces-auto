import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasOne,
  HasMany
} from 'sequelize-typescript';
import Trip from './trip';
import WorkingHours from './workingHours';

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

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  documentNumber!: string;

  @Column(DataType.STRING)
  picture?: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;

  @Default(true)
  @Column(DataType.BOOLEAN)
  active!: boolean;
  
  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => Trip)
  trips!: Trip[];

  @HasMany(() => WorkingHours)
  workingHours: WorkingHours[];
}