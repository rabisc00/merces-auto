import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { User, UserCreate, UserDetails, UserUpdate } from "../types/user";
import { UsersOptionsNavigationProp } from "../types/navigation";
import { ImageProps } from "../types/image";
import { CreateResponse, ListResponse, LoginResponse } from "../types/api";
import { Alert } from "react-native";

export const fetchUsers = async (page: number, userToken: string | null): Promise<ListResponse<User>> => {
    try {
        const res = await axios.get<ListResponse<User>>(`${API_BASE_URL}/users/retrieve?page=${page}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error fetching users:', error);

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
    showLoading: () => void,
    hideLoading: () => void
): Promise<UserDetails> => {
    try {
        showLoading();
        const response = await axios.get<UserDetails>(`${API_BASE_URL}/users/retrieve/${userId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response.data;
    } catch(error) {
        console.error('Error fetching users:', error);
        throw error;
    } finally {
        hideLoading();
    }
};

export const registerUser = async (
    user: UserCreate,
    userToken: string | null,
    showLoading: () => void,
    hideLoading: () => void
) => {
    try {
        showLoading();

        if (!userToken) {
            Alert.alert(ALERT_MESSAGES.INVALID_TOKEN.title, ALERT_MESSAGES.INVALID_TOKEN.message);
            return;
        }

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
    } catch (error: any) {
        console.error(error.status);
        Alert.alert("Registration failed", "Invalid input data");
    } finally {
        hideLoading();
    }
};


export const saveChanges = async (
    user: UserUpdate, 
    image: ImageProps | null,
    userToken: string | null,
    showLoading: () => void,
    hideLoading: () => void,
    navigation: UsersOptionsNavigationProp
) => {
    try {
        showLoading();

        if (!userToken) {
            Alert.alert(ALERT_MESSAGES.INVALID_TOKEN.title, ALERT_MESSAGES.INVALID_TOKEN.message);
            return;
        }

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

        const response = await axios.patch(`${API_BASE_URL}/users/edit/${user.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userToken}`
            }
        });

        navigation.goBack();
    } catch (error) {
        console.error("Error updating user:", error);
    } finally {
        hideLoading();
    }
};

export const deleteUser = async (
    userId: string | undefined,
    userToken: string | undefined,
    showLoading: () => void,
    hideLoading: () => void
) => {
    try {
        showLoading();

        if (!userId) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        if (!userToken) {
            Alert.alert(ALERT_MESSAGES.INVALID_TOKEN.title, ALERT_MESSAGES.INVALID_TOKEN.message);
            return;
        }

        await axios.delete(`${API_BASE_URL}/users/delete/${userId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    } catch (error: any) {
        if (error.response.status === 403) {
            Alert.alert("Deletion failed", "You can't delete an admin.");
        }
        
        console.log(error);
    } finally {
        hideLoading()
    }
};

export const userLogin = async (
    email: string,
    password: string,
    login: (userToken: string) => void,
    setIsAdmin: (isAdmin: boolean) => void
) => {
    try {
        const res = await axios.post<LoginResponse>(`${API_BASE_URL}/users/login`, { 
            email,
            password
        });

        login(res.data.token);
        setIsAdmin(res.data.isAdmin);

        return true;
    } catch (error) {
        console.log(error);
        Alert.alert("Login Failed", "Access Denied");
    }
}