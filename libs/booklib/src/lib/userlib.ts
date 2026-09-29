export interface UserCreated {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface UserToLog {
    email: string;
    password: string;
}