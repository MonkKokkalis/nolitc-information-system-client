export interface AuthenticationState {
    user: {
        username: string;
        type: string;
    };
    token: string;
}

export interface AuthInfo {
    user: {username: string, type: string};
    token: string;
}
