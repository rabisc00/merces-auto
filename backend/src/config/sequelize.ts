import { Sequelize } from "sequelize-typescript";
import * as dotenv from 'dotenv';
import Bus from '../models/bus';
import BusRoute from '../models/busRoute';
import Timetable from '../models/timetable';
import DayOfTheWeek from '../models/dayOfTheWeek';
import Driver from '../models/driver';
import TimetableDay from '../models/timetableDay';
import User from '../models/user';
import WorkingHours from '../models/workingHours';
import Trip from "../models/trip";

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
        timezone: '+01:00',
        models: [Bus, BusRoute, Timetable, DayOfTheWeek, Driver, TimetableDay, Trip, User, WorkingHours]
    }
);