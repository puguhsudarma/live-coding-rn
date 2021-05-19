export interface Profile {
    id: number;
    name: string;
    email: string;
}

export interface AccountState {
    access_token: string | null;
    expired_at: number | null;
    profile: Profile | null;
}
