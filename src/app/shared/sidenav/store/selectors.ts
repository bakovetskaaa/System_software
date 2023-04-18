import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../types/app-state.interface';
import { SideNavStateInterface } from '../types/side-nav-state.interface';

export const mainFeatureSelector = (
  state: AppStateInterface
): SideNavStateInterface => state.sideNav;

export const isOpenSelector = createSelector(
  mainFeatureSelector,
  (state: SideNavStateInterface) => state.isOpen
);

export const foldersSelector = createSelector(
  mainFeatureSelector,
  (state: SideNavStateInterface) => state.folders
);
