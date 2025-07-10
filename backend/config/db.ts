import { Sequelize } from "sequelize-typescript";
import { Bus } from "../models/bus";
import { Driver } from "../models/driver";
import { BusRoute } from "../models/busRoute";
import { RouteTime } from "../models/routeTime";
import { Travel } from "../models/travel";
import { WorkingHours } from "../models/workingHours";
import { DayOfTheWeekTime } from "../models/dayOfTheWeekTime";
import { DayOfTheWeek } from "../models/dayOfTheWeek";
import * as dotenv from 'dotenv';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Bus, Driver, BusRoute, RouteTime, Travel, WorkingHours, DayOfTheWeek, DayOfTheWeekTime]
});