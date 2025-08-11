import axios from "axios";
import { LoginResponse } from "../types/api";
import { API_BASE_URL } from "../config/api";
import { showError } from "../utils/alerts";

export const userLogin = async (
    email: string,
    password: string
): Promise<LoginResponse | undefined> => {
    try {
        const res = await axios.post<LoginResponse>(`${API_BASE_URL}/token`, { 
            email,
            password
        });

        return res.data;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
    }
}