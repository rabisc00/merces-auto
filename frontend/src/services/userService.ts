import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { User, UserCreate, UserDetails, UserUpdate } from "../types/user";
import { ImageProps } from "../types/image";
import { CreateResponse, ListResponse, LoginResponse } from "../types/api";
import { showError } from "../utils/alerts";

export const fetchUsers = async (page: number, userToken: string | null): Promise<ListResponse<User>> => {
    try {
        const res = await axios.get<ListResponse<User>>(`${API_BASE_URL}/users/retrieve?page=${page}`, {
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
            totalPages: 1,
            totalCount: 0,
            records: []
        };
    }
};

export const getUserDetails = async (
    userId: string, 
    userToken: string | null,
): Promise<UserDetails> => {
    try {
        const response = await axios.get<UserDetails>(`${API_BASE_URL}/users/retrieve/${userId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response.data;
    } catch (error: any) {
        console.error(error);
        showError(error.status);
        throw error;
    }
};

export const registerUser = async (
    user: UserCreate,
    userToken: string | null
): Promise<boolean> => {
    console.log(user);
    
    try {
        const res = await axios.post<CreateResponse>(`${API_BASE_URL}/users/create`, {
            email: user.email,
            password: user.password,
            name: user.name,
            documentNumber: user.documentNumber,
            isAdmin: user.isAdmin
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return true;
    } catch (error: any) {
        console.error(error.response?.status);
        showError(error.response?.status);
        return false;
    }
};


export const saveUserChanges = async (
    userId: string,
    user: UserUpdate, 
    image: ImageProps | null,
    userToken: string | null,
): Promise<boolean> => {
    try {
        const formData = new FormData();
        if (image?.uri) {
            formData.append('picture', {
                uri: image?.uri,
                name: image?.fileName || 'upload.jpg',
                type: image?.type || 'image/jpeg'
            } as any);
        }

        if (user.documentNumber) {
            formData.append('documentNumber', user.documentNumber);
        }
        
        if (user.name) {
            formData.append('name', user.name);
        }

        formData.append('active', user.active ? "true" : "false");

        await axios.patch(`${API_BASE_URL}/users/edit/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userToken}`
            }
        });

        return true;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
        return false;
    }
};

export const deleteUser = async (
    userId: string,
    userToken: string | null,
) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/delete/${userId}`, {
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

export const userLogin = async (
    email: string,
    password: string
): Promise<LoginResponse | undefined> => {
    try {
        const res = await axios.post<LoginResponse>(`${API_BASE_URL}/users/login`, { 
            email,
            password
        });

        return res.data;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.status);
    }
}