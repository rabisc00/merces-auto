import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import driverRoutes from './routes/driver';
import busRoutes from './routes/bus';
import busRouteRoutes from './routes/busRoute';
import busRouteTimetableRoutes from './routes/busRouteTimetable';
import workingHoursRoutes from './routes/workingHours';
import { sequelize } from './database';

const app = express();
app.use(bodyParser.json());

app.use(tokenRoutes);
app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);
app.use('/buses', busRoutes);
app.use('/busroutes', busRouteRoutes);
app.use('/busroutetimetables', busRouteTimetableRoutes);
app.use('/workinghours', workingHoursRoutes);

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