import axios from "axios";
import { CreateResponse, ListResponse } from "../types/api";
import { BusRoute, BusRouteCreate, BusRouteDetails, BusRouteUpdate } from "../types/busRoute";
import { showError } from "../utils/alerts";
import { API_BASE_URL } from "../config/api";

export const fetchBusRoutes = async (
    page: number,
    userToken: string | null
): Promise<ListResponse<BusRoute>> => {
    try {
        const res = await axios.get<ListResponse<BusRoute>>(`${API_BASE_URL}/busroutes/retrieve?page=${page}`, {
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
    busRouteId: string,
    userToken: string | null
): Promise<BusRouteDetails> => {
    try {
        const res = await axios.get<BusRouteDetails>(`${API_BASE_URL}/busroutes/retrieve/${busRouteId}`, {
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

export const registerBus = async (
    busRoute: BusRouteCreate,
    userToken: string | null
): Promise<boolean> => {
    try {
        const res = axios.post<CreateResponse>(`${API_BASE_URL}/busroutes/create`, {
            lineNumber: busRoute.lineNumber,
            origin: busRoute.origin,
            destination: busRoute.destination
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

export const saveChanges = async (
    busRoute: BusRouteUpdate,
    busRouteId: string,
    userToken: string | null
): Promise<boolean> => {
    try {
        const res = axios.patch(`${API_BASE_URL}/busroutes/edit/${busRouteId}`, {
            lineNumber: busRoute.lineNumber,
            origin: busRoute.origin,
            destination: busRoute.destination
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

export const deleteBusRoute = async (
    busRouteId: string,
    userToken: string | null
) => {
    try {
        await axios.delete(`${API_BASE_URL}/busroutes/delete/${busRouteId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
    }
};