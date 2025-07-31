export type BusRoute = {
    id: string;
    lineNumber: string;
    origin: string;
    destination: string;
};

export type BusRouteDetails = {
    id: string;
    lineNumber: string;
    origin: string;
    destination: string;
    averageTimeInMinutes: number;
    distanceInKm: number;
    createdAt?: string;
    updatedAt?: string;
};

export type BusRouteCreate = {
    lineNumber: string;
    origin: string;
    destination: string;
};

export type BusRouteUpdate = {
    lineNumber: string;
    origin: string;
    destination: string;
}