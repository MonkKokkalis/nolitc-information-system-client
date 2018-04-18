export interface AuthenticationState {
    user: {
        username: string;
        type: string;
        firstname: string,
        lastname: string
    };
    token: string;
}

export interface AuthInfo {
    user: {username: string, type: string, firstname: string, lastname: string};
    token: string;
}
