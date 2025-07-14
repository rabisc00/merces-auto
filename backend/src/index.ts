import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import { sequelize } from './database';
import { applyAssociations } from './models/associations';

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);

applyAssociations();

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL');

        await sequelize.sync({ alter: true });
        console.log('Tables synced with models');

        app.listen(3000, () => {
            console.log('Server started on port 3000');
        })
    } catch (error) {
        console.log(error);
        console.log('Error connecting to the database');
    }
}

start();