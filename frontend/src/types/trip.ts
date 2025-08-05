export type Trip = {
    id: string;
    numberOfPassengers: number;
    timetable: {
        busRoute: {
            lineNumber: string;
            origin: string;
            destination: string;
        }
    }
};

export type TripDetails = {
    id: string;
    numberOfPassengers: number;
    observations?: string;
    bus: {
        busNumber: string;
        model: string;
    };
    user: {
        documentNumber: string;
        name: string;
    };
    timetable: {
        busRoute: {
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
    observations?: string;
};

export type TripUpdate = {
    userId: string;
    busId: string;
    timetableId: string;
    numberOfPassengers: string;
    observations?: string;
}