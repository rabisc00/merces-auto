import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Default,
  Unique,
  HasMany
} from 'sequelize-typescript';
import Trip from './trip';

@Table({
  tableName: 'buses',
  timestamps: true,
})
export default class Bus extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  busNumber!: string;

  @Column(DataType.STRING)
  model!: string;

  @Column(DataType.INTEGER)
  capacity!: number;

  @Column(DataType.INTEGER)
  manufacturingYear!: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  inRepair!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => Trip)
  trips!: Trip[];
}