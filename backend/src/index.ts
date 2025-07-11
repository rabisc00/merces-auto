import 'reflect-metadata';
import { sequelize } from './database';

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL');

        await sequelize.sync({ alter: true });
        console.log('Tables synced with models');
    } catch (error) {
        console.log(error);
        console.log('Error connecting to the database');
    } finally {
        await sequelize.close();
    }
}

start();