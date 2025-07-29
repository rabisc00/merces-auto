export type User = {
    id: string;
    documentNumber: string;
    name: string;
    active: boolean;
    isAdmin: boolean;
    picture?: string;
}

export type UserDetails = {
    id: string;
    documentNumber: string;
    name: string;
    email: string;
    active: boolean;
    isAdmin: boolean;
    picture?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type UserCreate = {
    email: string;
    password: string;
    name: string;
    documentNumber: string;
    isAdmin: boolean;
};

export type UserUpdate = {
    id: string;
    documentNumber?: string;
    name?: string;
    active?: boolean;
}