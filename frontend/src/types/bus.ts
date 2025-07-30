export type Bus = {
    id: string;
    busNumber: string;
    model?: string;
    inRepair: boolean;
};

export type BusDetails = {
    id: string;
    busNumber: string;
    inRepair: boolean;
    model?: string;
    capacity?: number;
    manufacturingYear?: number;
    createdAt?: string;
    updatedAt?: string;
};

export type BusCreate = {
    busNumber: string;
    manufacturingYear?: number;
    model?: string;
    capacity?: number;
};

export type BusUpdate = {
    inRepair: boolean;
    model?: string;
    capacity?: number;
    manufacturingYear?: number;
};