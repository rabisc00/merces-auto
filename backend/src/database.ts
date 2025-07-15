import * as dotenv from 'dotenv';
import { Sequelize } from "sequelize-typescript";
import Bus from './models/bus';
import BusRoute from './models/busRoute';
import BusRouteTimetable from './models/busRouteTimetable';
import DayOfTheWeek from './models/dayOfTheWeek';
import Driver from './models/driver';
import Place from './models/place';
import TimetableDay from './models/timetableDay';
import Travel from './models/travel';
import User from './models/user';
import WorkingHours from './models/workingHours';

dotenv.config();

export const sequelize = new Sequelize(
    {
        database: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        password: process.env.DB_PASSWORD, 
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        logging: false,
        models: [Bus, BusRoute, BusRouteTimetable, DayOfTheWeek, Driver, Place, TimetableDay, Travel, User, WorkingHours]
    }
);