import { DataTypes, Optional } from "sequelize";
import { Model } from "sequelize-typescript"
import { sequelize } from '../database';

interface BusAttributes {
    id: number;
    busNumber: string;
    model: string;
    capacity: number;
    manufacturingYear: number;
    inRepair: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface BusCreationAttributes extends Optional<BusAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Bus extends Model<BusAttributes, BusCreationAttributes> implements BusAttributes {
    public id!: number;
    public busNumber!: string;
    public model!: string;
    public capacity!: number;
    public inRepair!: boolean;
    public manufacturingYear!: number;
}

Bus.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    busNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    inRepair: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    model: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    manufacturingYear: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'Bus',
    tableName: 'buses',
    timestamps: true
});