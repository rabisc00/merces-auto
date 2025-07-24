import axios from "axios"
import { API_BASE_URL } from "../config/api"

export const fetchBuses = async (page: number, userToken: string) => {
    const res = await axios.get(`${API_BASE_URL}/buses/retrieve?page=${page}`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    
}