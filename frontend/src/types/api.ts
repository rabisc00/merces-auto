import { Bus } from "./bus";
import { BusRoute } from "./busRoute";
import { UserDetails } from "./user";

export interface LoginResponse {
    token: string;
    isAdmin: boolean;
};

export interface CreateResponse {
    message: string;
    id: string;
};

export type SearchResponse = {
    buses: Bus[],
    busRoutes: BusRoute[],
    users: UserDetails[]
};

export type ListResponse<T> = {
    currentPage: number,
    totalPages: number,
    totalCount: number,
    records: T[]
};