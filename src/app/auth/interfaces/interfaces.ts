export interface AuthResponse {
    ok: boolean;
    id?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;

}

export interface User {
    id?: string;
    name?: string;
    email?: string;
}