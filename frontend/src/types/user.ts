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
};

export type UserCreate = {
    email: string;
    password: string;
    name: string;
    documentNumber: string;
    isAdmin: boolean;
};

export type UserUpdate = {
    documentNumber?: string;
    name?: string;
    active?: boolean;
}