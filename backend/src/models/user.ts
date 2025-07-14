import {
  Model,
  DataTypes,
  Optional,
  Sequelize
} from 'sequelize';
import { sequelize } from '../database';
import jwt from 'jsonwebtoken';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
  picture?: Buffer;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public admin!: boolean;
  public active!: boolean;
  public picture?: Buffer;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public generateAuthToken(): string {
    return jwt.sign(
      { id: this.id, email: this.email, isAdmin: this.admin },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    picture: DataTypes.BLOB
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  }
);

export default User;