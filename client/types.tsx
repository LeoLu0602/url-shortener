export interface UrlFormType {
    longUrl: string;
    alias: string;
}

export interface AnalyticsType {
    alias: string;
    fullUrl: string;
    createdAt: string;
    count: number;
    lastTimeAccessed: string;
    id: number;
    userId: number;
}

export interface UserType {
    id: number;
    email: string;
    name: string;
    created_at: string;
}

export interface ActionType {
    type: 'sign-in' | 'sign-out';
    newAuth: UserType | null;
}

export interface UrlType {
    id: number;
    alias: string;
    fullUrl: string;
    userId: number;
    createdAt: string;
    count: number;
    lastTimeAccessed: string;
}
