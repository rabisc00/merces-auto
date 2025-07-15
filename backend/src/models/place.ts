import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import BusRoute from './busRoute';

@Table({
  tableName: 'places',
  timestamps: true,
})
export default class Place extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @HasMany(() => BusRoute, { foreignKey: 'originId', as: 'originRoutes' })
  originRoutes!: BusRoute[];

  @HasMany(() => BusRoute, { foreignKey: 'destinationId', as: 'destinatinationRoutes' })
  destinationRoutes!: BusRoute[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  latitude!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  longitude!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}