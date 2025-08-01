export type Timetable = {
    id: string;
    arrivalTime: string;
    departureTime: string;
};

export type TimetableDetails = {
    id: string;
    arrivalTime: string;
    departureTime: string;
    createdAt: string;
    updatedAt: string;
    busRoute: {
        id: string;
        lineNumber: string;
        origin: string;
        destination: string;
    };
    days: string[];
};

export type TimetableCreate = {
    busRouteId: string;
    arrivalTime: string;
    departureTime: string;
    days: string[];
};

export type TimetableUpdate = {
    busRouteId: string;
    arrivalTime: string;
    departureTime: string;
    days: string[];
};