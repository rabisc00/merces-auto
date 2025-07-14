import { DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';
import { RouteTime } from './routeTime';
import { Table, Model, Column, NotNull, AutoIncrement, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';

interface BusRouteAttributes {
    id: number;
    lineNumber: string;
    origin: string;
    destination: string;
    distanceInKm: number;
    averageTimeInMinutes: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface BusCreationAttributes extends Optional<BusRouteAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class BusRoute extends Model<BusRouteAttributes, BusCreationAttributes> implements BusRouteAttributes {
    public id!: number;
    public lineNumber!: string;
    public origin!: string;
    public destination!: string;
    public distanceInKm!: number;
    public averageTimeInMinutes: number;
} 

BusRoute.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lineNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    distanceInKm: DataType.INTEGER,
    averageTimeInMinutes: DataType.INTEGER
}, {
    sequelize,
    modelName: 'BusRoute',
    tableName: 'bus_routes',
    timestamps: true
});