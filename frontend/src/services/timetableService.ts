import axios from "axios";
import { Timetable, TimetableCreate, TimetableDetails, TimetableUpdate } from "../types/timetable";
import { showError } from "../utils/alerts";
import { API_BASE_URL } from "../config/api";
import { CreateResponse } from "../types/api";

export const fetchTimetables = async (
    busRouteId: string,
    date: string,
    userToken: string
): Promise<Timetable[]> => {
    try {
        const res = await axios.get<Timetable[]>(`${API_BASE_URL}/timetables/retrieve/byroute/${busRouteId}?date=${date}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        throw error;
    }
};

export const getTimetableDetails = async (
    timetableId: string,
    userToken: string
): Promise<TimetableDetails> => {
    try {
        const res = await axios.get<TimetableDetails>(`${API_BASE_URL}/timetables/retrieve/${timetableId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        throw error;
    }
};

export const registerTimetable = async (
    timetable: TimetableCreate,
    userToken: string
): Promise<boolean> => {
    try {
        await axios.post<CreateResponse>(`${API_BASE_URL}/timetables/create`, {
            busRouteId: timetable.busRouteId,
            arrivalTime: timetable.arrivalTime,
            departureTime: timetable.departureTime,
            days: timetable.days
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return true;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        return false;
    }
};

export const saveTimetableChanges = async (
    timetable: TimetableUpdate,
    timetableId: string,
    userToken: string
): Promise<boolean> => {
    try {
        await axios.patch(`${API_BASE_URL}/timetables/edit/${timetableId}`, {
            busRouteId: timetable.busRouteId,
            arrivalTime: timetable.arrivalTime,
            departureTime: timetable.departureTime,
            days: timetable.days
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return true;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        return false;
    }
};

export const deleteTimetable = async (
    timetableId: string,
    userToken: string
) => {
    try {   
        await axios.delete(`${API_BASE_URL}/timetables/delete/${timetableId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        throw error;
    }
}