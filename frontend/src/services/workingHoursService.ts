import axios from "axios";
import { CreateResponse, ListResponse } from "../types/api";
import { WorkingHours, WorkingHoursCreate, WorkingHoursDetails, WorkingHoursUpdate } from "../types/workingHours";
import { showError } from "../utils/alerts";
import { API_BASE_URL } from "../config/api";
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

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
        const res = await axios.get<WorkingHoursDetails>(`${API_BASE_URL}/workinghours/retrieve/${workingHoursId}`, {
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
    signature: string,
    userToken: string | null
): Promise<boolean> => {
    try {
        const formData = new FormData();

        const base64 = signature.replace(/^data:image\/\w+;base64,/, '');
        const tempPath = `${RNFS.CachesDirectoryPath}/signature.png`;
        await RNFS.writeFile(tempPath, base64, 'base64');

        const resized = await ImageResizer.createResizedImage(
            tempPath,
            200,
            100,
            'JPEG',
            70
        );

        formData.append('signature', {
            uri: resized.uri,
            type: 'image/jpeg',
            name: 'signature.jpg'
        } as any);

        formData.append('userId', workingHours.userId);
        formData.append('startTime', workingHours.startTime);
        formData.append('endTime', workingHours.endTime);

        await axios.post<CreateResponse>(`${API_BASE_URL}/workinghours/create`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${userToken}`
            },
            maxBodyLength: Infinity
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