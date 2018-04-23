import { Action } from '@ngrx/store';
import { UserFile } from '../../interfaces/files.interface';

export enum UserFilesActionTypes {
    SETUSERFILES = '[UserFiles] SetUserFiles',
    SETARRAYPOINTER = '[UserFiles] SetArrayPointer',
    RESETARRAYPOINTER = '[UserFiles] ResetArrayPointer'
}

export class SetUserFiles implements Action {
    readonly type = UserFilesActionTypes.SETUSERFILES;
    constructor(public payload: [UserFile[]]) {}
}

export class SetArrayPointer implements Action {
    readonly type = UserFilesActionTypes.SETARRAYPOINTER;
    constructor(public payload: number) {}
}

export class ResetArrayPointer implements Action {
    readonly type = UserFilesActionTypes.RESETARRAYPOINTER;
}

export type UserFilesActions = SetUserFiles | SetArrayPointer | ResetArrayPointer;
