import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

interface PlaceAttributes {
    id: number;
    latitude: string;
    longitude: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PlaceCreationAttributes extends Optional<PlaceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Place extends Model<PlaceAttributes, PlaceCreationAttributes> implements PlaceAttributes {
    public id!: number;
    public latitude!: string;
    public longitude!: string;
}

Place.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Place',
    tableName: 'places',
    timestamps: true
})