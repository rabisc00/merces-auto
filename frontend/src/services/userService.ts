import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { User } from "../types/user";
import { UsersOptionsNavigationProp } from "../types/navigation";
import { ImageProps } from "../types/image";

export const fetchUsers = async (page: number, userToken: string | null) => {
    const res = await axios.get(`${API_BASE_URL}/users/retrieve?page=${page}`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    return {
        data: res.data.records,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage
    };
};

export const saveChanges = async (
    user: User, 
    image: ImageProps | null,
    userToken: string | null,
    showLoading: () => void,
    hideLoading: () => void,
    navigation: UsersOptionsNavigationProp
) => {
    try {
        showLoading();

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
    userId: string,
    userToken: string,
    showLoading: () => void,
    hideLoading: () => void
) => {
    try {
        showLoading();
        await axios.delete(`${API_BASE_URL}/users/delete/${userId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoading()
    }
}