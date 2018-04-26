import { Action } from '@ngrx/store';
import { UserFile } from '../../interfaces/files.interface';
import { User } from '../../interfaces/ngrx.interface';

export enum UserFilesActionTypes {
    INITFILES = '[UserFiles] InitFiles',
    SETUSERFILES = '[UserFiles] SetUserFiles',
    SETARRAYPOINTER = '[UserFiles] SetArrayPointer',
    RESETARRAYPOINTER = '[UserFiles] ResetArrayPointer',
    SETSELECTEDINDEX = '[UserFiles] SetSelectedIndex'
}

export class InitFiles implements Action {
    readonly type = UserFilesActionTypes.INITFILES;
    constructor(public payload: User) {}
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

export class SetSelectedIndex implements Action {
    readonly type = UserFilesActionTypes.SETSELECTEDINDEX;
    constructor(public payload: number) {}
}

export type UserFilesActions = InitFiles | SetUserFiles | SetArrayPointer |
ResetArrayPointer| SetSelectedIndex;
