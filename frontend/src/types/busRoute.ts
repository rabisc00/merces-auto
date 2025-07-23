export type BusRoute = {
    id: string;
    lineNumber: string;
    origin: string;
    destination: string;
    averageTimeInMinutes: number;
    distanceInKm: number;
    createdAt?: string;
    updatedAt?: string;
}