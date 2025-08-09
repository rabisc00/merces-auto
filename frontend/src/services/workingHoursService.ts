import axios from "axios";
import { CreateResponse, ListResponse } from "../types/api";
import { WorkingHours, WorkingHoursCreate, WorkingHoursDetails, WorkingHoursUpdate } from "../types/workingHours";
import { showError } from "../utils/alerts";
import { API_BASE_URL } from "../config/api";

export const fetchWorkingHoursByUser = async (
    userId: string,
    page: number,
    userToken: string | null
): Promise<ListResponse<WorkingHours>> => {
    try {
        const res = await axios.get<ListResponse<WorkingHours>>(`${API_BASE_URL}/workinghours/retrieve/byuser/${userId}?page=${page}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error: any) {  
        console.error(error);
        showError(error.response?.status);

        return {
            currentPage: page,
            totalPages: 0,
            totalCount: 0,
            records: []
        };
    }
};

export const getWorkingHoursDetails = async (
    workingHoursId: string,
    userToken: string | null
): Promise<WorkingHoursDetails> => {
    try {
        const res = await axios.get<WorkingHoursDetails>(`${API_BASE_URL}/workinghours/${workingHoursId}`, {
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

export const registerWorkingHours = async (
    workingHours: WorkingHoursCreate,
    userToken: string | null
): Promise<boolean> => {
    try {
        await axios.post<CreateResponse>(`${API_BASE_URL}/workinghours/create`, {
            userId: workingHours.userId,
            startTime: workingHours.startTime,
            endTime: workingHours.endTime
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return true;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        throw error;
    }
};

export const saveWorkingHoursChanges = async (
    workingHours: WorkingHoursUpdate,
    workingHoursId: string,
    userToken: string | null
): Promise<boolean> => {
    try {
        await axios.patch(`${API_BASE_URL}/workinghours/edit/${workingHoursId}`, {
            startTime: workingHours.startTime,
            endTime: workingHours.endTime
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

export const deleteWorkingHours = async (
    workingHoursId: string,
    userToken: string | null
) => {
    try {
        await axios.delete(`${API_BASE_URL}/workinghours/delete/${workingHoursId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        throw error;
    }
};