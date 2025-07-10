import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique} from "sequelize-typescript"

@Table({ tableName: 'buses' })
export class Bus extends Model<Bus> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: string;

    @Unique
    @Column(DataType.STRING)
    busNumber!: string;

    @Column(DataType.STRING)
    model!: string;

    @Column(DataType.INTEGER)
    capacity!: number;

    @Column(DataType.INTEGER)
    manufactoringYear!: number;

    @Column(DataType.BOOLEAN)
    repair!: boolean;
}