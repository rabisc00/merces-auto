export interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: number;
        email: string;
        isAdmin: boolean;
    }
};