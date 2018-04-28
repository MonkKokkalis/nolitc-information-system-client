import * as fileUploadAction from '../actions/fileupload.actions';
export interface State {
    visible: boolean;
    files: File[];
    fileUploadState: string;
}

export const initialState: State = {
    visible: false,
    files: null,
    fileUploadState: fileUploadAction.FileUploadState.STANDBY
};

export function reducer (state = initialState,
        action: fileUploadAction.FileUploadAction) {
            switch (action.type) {
                case fileUploadAction.FileUploadActionTypes.HIDEWINDOW:
                    return {
                        ...state, visible: false
                    };
                case fileUploadAction.FileUploadActionTypes.SHOWWINDOW:
                    return {
                        ...state, visible: true
                    };
                case fileUploadAction.FileUploadActionTypes.SETFILES:
                    return {
                        ...state, files: action.payload
                    };
                case fileUploadAction.FileUploadActionTypes.SETFILEUPLOADSTATE:
                    return {
                        ...state, fileUploadState: action.payload
                    };
                default: return state;
            }
}

export const getWindowVisibility = (state: State) => state.visible;
export const getFilesForUpload = (state: State) => state.files;
export const getFileUploadState = (state: State) => state.fileUploadState;
