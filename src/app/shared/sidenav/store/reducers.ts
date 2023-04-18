import { Action, createReducer, on } from '@ngrx/store';
import { SideNavStateInterface } from '../types/side-nav-state.interface';
import {
  closeSidenavAction,
  getFoldersAction,
  getFoldersFailureAction,
  getFoldersSuccessAction,
  openSidenavAction,
} from './actions/sidenav-actions';

const initialState: SideNavStateInterface = {
  isOpen: false,
  folders: [],
  isLoading: false,
};

const sideNavReducer = createReducer(
  initialState,
  on(
    openSidenavAction,
    (state): SideNavStateInterface => ({
      ...state,
      isOpen: true,
    })
  ),
  on(
    closeSidenavAction,
    (state): SideNavStateInterface => ({
      ...state,
      isOpen: false,
    })
  ),
  on(
    getFoldersAction,
    (state): SideNavStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getFoldersSuccessAction,
    (state, action): SideNavStateInterface => ({
      ...state,
      folders: action.folders,
      isLoading: false,
    })
  ),
  on(
    getFoldersFailureAction,
    (state): SideNavStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducer(state: SideNavStateInterface, action: Action) {
  return sideNavReducer(state, action);
}
