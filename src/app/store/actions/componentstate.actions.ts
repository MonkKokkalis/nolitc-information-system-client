import { Action } from '@ngrx/store';

export enum ComponentActionTypes {
    SETALERTTEXT = '[Component] SetAlertText',
    SHOWALERT = '[Component] ShowAlert'
}

export class SetAlertText implements Action {
    readonly type = ComponentActionTypes.SETALERTTEXT;
    constructor(public payload: string) {}
}

export class ShowAlert implements Action {
    readonly type = ComponentActionTypes.SHOWALERT;
}

export type ComponentActions = SetAlertText | ShowAlert;
