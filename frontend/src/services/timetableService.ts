import axios from "axios";
import { Timetable, TimetableCreateRequest, TimetableDetails, TimetableUpdateRequest } from "../types/timetable";
import { showError } from "../utils/alerts";
import { API_BASE_URL } from "../config/api";
import { CreateResponse, ListResponse } from "../types/api";

export const fetchTimetables = async (
    page: number,
    userToken: string | null
): Promise<ListResponse<Timetable>> => {
    try {
        const res = await axios.get<ListResponse<Timetable>>(`${API_BASE_URL}/timetables/retrieve?page=${page}`, {
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
}

export const fetchTimetablesByRoute = async (
    busRouteId: string,
    date: string,
    userToken: string | null
): Promise<ListResponse<Timetable>> => {
    try {
        const res = await axios.get<Timetable[]>(`${API_BASE_URL}/timetables/retrieve/byroute/${busRouteId}?date=${date}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        console.log(`${API_BASE_URL}/timetables/retrieve/byroute/${busRouteId}?date=${date}`);

        const listResponse: ListResponse<Timetable> = {
            currentPage: 0,
            totalPages: 0,
            totalCount: 0,
            records: res.data
        };

        return listResponse;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        throw error;
    }
};

export const getTimetableDetails = async (
    timetableId: string,
    userToken: string | null
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
    timetable: TimetableCreateRequest,
    userToken: string | null
): Promise<boolean> => {
    try {
        console.log(timetable);
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
    timetable: TimetableUpdateRequest,
    timetableId: string,
    userToken: string | null
): Promise<boolean> => {
    try {
        await axios.patch(`${API_BASE_URL}/timetables/edit/${timetableId}`, {
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
    userToken: string | null
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