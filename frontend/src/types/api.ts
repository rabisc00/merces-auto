export interface LoginResponse {
    token: string;
    isAdmin: boolean;
};

export interface CreateResponse {
    message: string;
    id: string;
}