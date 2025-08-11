import axios from "axios"
import { Trip, TripCreate, TripUpdate } from "../types/trip"
import { API_BASE_URL } from "../config/api"
import { showError } from "../utils/alerts";
import { CreateResponse, ListResponse } from "../types/api";
import { TripDetails } from "../types/trip";

export const fetchTripsByUser = async (
    userId: string,
    userToken: string | null,
    page: number
): Promise<ListResponse<Trip>> => {
    try {
        const res = await axios.get<ListResponse<Trip>>(`${API_BASE_URL}/trips/retrieve/byuser/${userId}?page=${page}`, {
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

export const fetchTripsByBus = async (
    busId: string,
    userToken: string | null,
    page: number
): Promise<ListResponse<Trip>> => {
    try {
        const res = await axios.get<ListResponse<Trip>>(`${API_BASE_URL}/trips/retrieve/bybus/${busId}?page=${page}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data
    } catch (error: any) {
        console.error(error);
        showError(error.response?.error);
        throw error;
    }
};

export const getTripDetails = async (
    tripId: string,
    userToken: string | null
): Promise<TripDetails> => {
    try {
        const res = await axios.get<TripDetails>(`${API_BASE_URL}/trips/retrieve/${tripId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.error);
        throw error;
    }
};

export const registerTrip = async (
    trip: TripCreate,
    userToken: string | null
): Promise<boolean> => {
    try {
        await axios.post<CreateResponse>(`${API_BASE_URL}/trips/create`, {
            numberOfPassengers: trip.numberOfPassengers,
            observations: trip.observations,
            userId: trip.userId,
            busId: trip.busId,
            timetableId: trip.timetableId
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return true;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.error);
        return false;
    }
};

export const saveTripChanges = async (
    trip: TripUpdate,
    tripId: string,
    userToken: string | null
): Promise<boolean> => {
    try {
        await axios.patch(`${API_BASE_URL}/trips/edit/${tripId}`, {
            numberOfPassengers: trip.numberOfPassengers,
            observations: trip.observations,
            userId: trip.userId,
            busId: trip.busId,
            timetableId: trip.timetableId
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return true;
    } catch (error: any) {
        console.error(error);
        showError(error.response?.error);
        return false;
    }
};

export const deleteTrip = async (
    tripId: string,
    userToken: string | null
) => {
    try {
        await axios.delete(`${API_BASE_URL}/trips/delete/${tripId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
    } catch (error: any) {
        console.error(error);
        showError(error.response?.error);
        throw error;
    }
};