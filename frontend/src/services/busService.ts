import axios from "axios"
import { API_BASE_URL } from "../config/api"
import { CreateResponse, ListResponse } from "../types/api";
import { Bus, BusCreate, BusDetails, BusUpdate } from "../types/bus";
import { showError } from "../utils/alerts";

export const fetchBuses = async (
    page: number, 
    userToken: string | null
): Promise<ListResponse<Bus>> => {
    try {
        const res = await axios.get<ListResponse<Bus>>(`${API_BASE_URL}/buses/retrieve?page=${page}`, {
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

export const getBusDetails = async (
    busId: string, 
    userToken: string | null
): Promise<BusDetails> => {
    try {
        const res = await axios.get<Bus>(`${API_BASE_URL}/buses/retrieve/${busId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error: any) {
        showError(error.response?.status)
        throw error;
    }
};

export const registerBus = async (
    bus: BusCreate,
    userToken: string | null
): Promise<boolean> => {
    try {
        await axios.post<CreateResponse>(`${API_BASE_URL}/buses/create`, {
            busNumber: bus.busNumber,
            model: bus.model,
            capacity: bus.capacity as number,
            manufacturingYear: bus.manufacturingYear as number
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

export const saveBusChanges = async (
    busId: string,
    bus: BusUpdate,
    userToken: string | null
): Promise<boolean> => {
    try {
        console.log(busId);
        await axios.patch(`${API_BASE_URL}/buses/edit/${busId}`, {
            busNumber: bus.busNumber,
            model: bus.model,
            capacity: bus.capacity || null,
            manufacturingYear: bus.manufacturingYear || null,
            inRepair: bus.inRepair
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

export const deleteBus = async (
    busId: string,
    userToken: string | null
) => {
    try {
        await axios.delete(`${API_BASE_URL}/buses/delete/${busId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
    }
}