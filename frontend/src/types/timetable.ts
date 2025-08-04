type DayId = {
    dayId: number;
};

type BusRoute = {
    id: string;
    lineNumber: string;
    origin: string;
    destination: string;
}

export type Timetable = {
    id: string;
    arrivalTime: string;
    departureTime: string;
    days: DayId[];
    busRoute: BusRoute
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
    days: number[];
};

export type TimetableCreateRequest = {
    busRouteId: string;
    arrivalTime: string;
    departureTime: string;
    days: number[];
};

export type TimetableCreateForm = {
    busRouteId: string;
    arrivalTime: string;
    departureTime: string;
    days: string[];
};

export type TimetableUpdate = {
    busRouteId: string;
    arrivalTime: string;
    departureTime: string;
    days: string[] | number[];
};