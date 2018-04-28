export interface Files {
    url: string;
    files: [File[]];
}

export interface Response {
    files: number;
}

export interface UserFile {
    filename: string;
    size: string;
    filetype: string;
    downloadUrl: string;
}

