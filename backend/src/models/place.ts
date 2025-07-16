import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Default,
} from 'sequelize-typescript';
import BusRoute from './busRoute';

@Table({
  tableName: 'places',
  timestamps: true,
})
export default class Place extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

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

  @HasMany(() => BusRoute, { foreignKey: 'originId', as: 'originRoutes' })
  originRoutes!: BusRoute[];

  @HasMany(() => BusRoute, { foreignKey: 'destinationId', as: 'destinatinationRoutes' })
  destinationRoutes!: BusRoute[];
}