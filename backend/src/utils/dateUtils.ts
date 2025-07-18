import dayjs from './dayjs';
import { SQL_DATE_FORMAT } from '../constants/date';

export const isValidDate = (val: string) => 
    dayjs(val, SQL_DATE_FORMAT, true).isValid();