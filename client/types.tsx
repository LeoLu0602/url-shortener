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
    id: string;
    userId: string;
}

export interface UserType {
    id: number;
    email: string;
    name: string;
    created_at: string;
}
