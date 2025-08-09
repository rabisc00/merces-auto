type User = {
    id: string;
    name: string;
    documentNumber: string;
}

export type WorkingHours = {
    id: string;
    startTime: string;
    endTime: string;
    user: User;
};

export type WorkingHoursDetails = {
    id: string;
    startTime: string;
    endTime: string;
    signature: string;
    user: User;
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