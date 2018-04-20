import { File, Files } from './files.interface';

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

export interface AppState {
    authenticationState: AuthenticationState;
    filesArrayState: FilesArrayState;
}

export interface FilesArrayState {
    files: [File[]];
}

export interface User {
    username: string;
    type: string;
    firstname: string;
    lastname: string;
}
