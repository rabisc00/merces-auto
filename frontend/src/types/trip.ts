export type Trip = {
    id: string;
    numberOfPassengers: number;
    date: string;
    timetable: {
        arrivalTime: string;
        departureTime: string;
        busRoute: {
            id: string;
            lineNumber: string;
            origin: string;
            destination: string;
        }
    }
};

export type TripDetails = {
    id: string;
    numberOfPassengers: number;
    date: string;
    observations?: string;
    createdAt: string;
    updatedAt: string;
    bus: {
        id: string;
        busNumber: string;
        model: string;
    };
    user: {
        id: string;
        documentNumber: string;
        name: string;
    };
    timetable: {
        id: string;
        arrivalTime: string;
        departureTime: string;
        busRoute: {
            id: string;
            lineNumber: string;
            origin: string;
            destination: string;
            distanceInKm: number;
            averageTimeInMinuters: number;
        }
    }
};

export type TripCreate = {
    userId: string;
    busId: string;
    timetableId: string;
    numberOfPassengers: number;
    date: string;
    observations?: string;
};

export type TripUpdate = {
    userId: string;
    busId: string;
    timetableId: string;
    numberOfPassengers: number;
    date: string;
    observations?: string;
}