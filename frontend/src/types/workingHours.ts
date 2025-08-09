export type WorkingHours = {
    id: string;
    startTime: string;
    endTime: string;
    userId: string;
};

export type WorkingHoursDetails = {
    id: string;
    startTime: string;
    endTime: string;
    signature: string;
};

export type WorkingHoursCreate = {
    userId: string;
    startTime: string;
    endTime: string;
};

export type WorkingHoursUpdate = {
    startTime: string;
    endTime: string;
};