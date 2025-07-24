import axios from "axios"
import { API_BASE_URL } from "../config/api"
import { ListResponse } from "../types/api";
import { Bus } from "../types/bus";

export const fetchBuses = async (page: number, userToken: string): Promise<ListResponse<Bus>> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/buses/retrieve?page=${page}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error) {
        console.log('Error fetching buses:', error);
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
    userToken: string | null, 
    showLoading: () => void,
    hideLoading: () => void
): Promise<Bus> => {
    try {
        showLoading();
        const res = await axios.get<Bus>(`${API_BASE_URL}/buses/retrieve/${busId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error) {
        console.log('Error fetching bus details:', error);
        throw error;
    } finally {
        hideLoading();
    }
};

