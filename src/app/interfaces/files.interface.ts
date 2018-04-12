export interface Files {
    url: string;
    files: [File[]];
}

export interface File {
    filename: string;
    size: string;
    filetype: string;
    downloadUrl: string;
}

export interface Response {
    files: number;
}
