import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Default,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user';
import Trip from './trip';
import WorkingHours from './workingHours';

@Table({
  tableName: 'drivers',
  timestamps: true,
})
class Driver extends Model<Driver> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  documentNumber!: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  active!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column(DataType.STRING)
  picture?: string;

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
    onDelete: 'CASCADE'
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Trip)
  trips!: Trip[];

  @HasMany(() => WorkingHours)
  workingHours: WorkingHours[];
}

export default Driver;