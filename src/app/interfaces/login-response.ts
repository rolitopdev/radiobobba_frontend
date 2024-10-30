export interface LoginResponse {
    user: {
        id: number,
        name: string,
        habboName: string,
        email: string,
        birthDate: string,
        role: number,
        location: string,
        image: string,
        ip: string,
        active: boolean
    },
    token: string,
    expiresAt: string
};