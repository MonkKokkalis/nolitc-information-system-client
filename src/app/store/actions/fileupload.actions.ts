import { Action } from '@ngrx/store';

export enum FileUploadActionTypes {
    SHOWWINDOW = '[FileUpload] ShowWindow',
    HIDEWINDOW = '[FileUpload] HideWindow',
    SETFILES = '[FileUpload] SetFiles',
    SETFILEUPLOADSTATE = '[FileUpload] SetFileUploadState'
}

export enum FileUploadState {
    STANDBY = 'Stand By',
    UPLOADING = 'Uploading',
}

export class ShowWindow implements Action {
    readonly type = FileUploadActionTypes.SHOWWINDOW;
}

export class HideWindow implements Action {
    readonly type = FileUploadActionTypes.HIDEWINDOW;
}

export class SetFiles implements Action {
    readonly type = FileUploadActionTypes.SETFILES;
    constructor(public payload: File[]) {}
}

export class SetFileUploadState implements Action {
    readonly type = FileUploadActionTypes.SETFILEUPLOADSTATE;
    constructor(public payload: string) {}
}

export type FileUploadAction = ShowWindow | HideWindow | SetFiles | SetFileUploadState;
