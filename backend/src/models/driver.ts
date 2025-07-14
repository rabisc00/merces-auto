import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../database';

interface DriverAttributes {
    id: number;
    userId: number;
    documentNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface DriverCreationAttributes extends Optional<DriverAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Driver extends Model<DriverAttributes, DriverCreationAttributes> implements DriverAttributes {
    public id!: number;
    public userId!: number;
    public documentNumber!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Driver.init({
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'users', 
            key: 'id' 
        }, 
        onDelete: 'CASCADE'
    },
    documentNumber: {
        type: DataTypes.STRING, 
        unique: true
    }
}, {
    sequelize,
    modelName: 'Driver',
    tableName: 'drivers',
    timestamps: true
});

export default Driver;