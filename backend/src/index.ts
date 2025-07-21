import 'reflect-metadata';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import driverRoutes from './routes/driver';
import busRoutes from './routes/bus';
import busRouteRoutes from './routes/busRoute';
import timetableRoutes from './routes/timetable';
import workingHoursRoutes from './routes/workingHours';
import tripRoutes from './routes/trip';
import filterRoutes from './routes/filter';
import { sequelize } from './database';
import { swaggerOptions } from './docs/swaggerOptions';

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(tokenRoutes);
app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);
app.use('/buses', busRoutes);
app.use('/busroutes', busRouteRoutes);
app.use('/timetables', timetableRoutes);
app.use('/workinghours', workingHoursRoutes);
app.use('/trips', tripRoutes);
app.use(filterRoutes);

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL');

        await sequelize.sync();
        console.log('Tables synced with models');
        
        app.listen(3000, () => {
            console.log('Server started on port 3000');
            console.log('Swagger docs at http://localhost:3000/api-docs');
        })
    } catch (error) {
        console.log(error);
        console.log('Error connecting to the database');
    }
}

start();