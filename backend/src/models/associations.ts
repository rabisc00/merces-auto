import Driver from "./driver";
import User from "./user";

export function applyAssociations() {
    User.belongsTo(Driver, {
        foreignKey: 'userId',
        as: 'driver'
    });

    Driver.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });
}