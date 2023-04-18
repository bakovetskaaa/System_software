import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const openSidenavAction = createAction(ActionTypes.OPEN_SIDENAV);

export const closeSidenavAction = createAction(ActionTypes.CLOSE_SIDENAV);

export const getFoldersAction = createAction(ActionTypes.GET_FOLDERS_ACTION);
export const getFoldersSuccessAction = createAction(
  ActionTypes.GET_FOLDERS_SUCCESS_ACTION,
  props<{ folders: string[] }>()
);
export const getFoldersFailureAction = createAction(
  ActionTypes.GET_FOLDERS_FAILURE_ACTION
);
