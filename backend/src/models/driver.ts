import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import User from './user';
import Travel from './travel';
import WorkingHours from './workingHours';

@Table({
  tableName: 'drivers',
  timestamps: true,
})
class Driver extends Model<Driver> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  documentNumber!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => Travel)
  travels!: Travel[];

  @HasMany(() => WorkingHours)
  workingHours: WorkingHours[];
}

export default Driver;