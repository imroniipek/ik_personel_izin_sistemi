import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveState } from './leave-reducer';

export const selectLeaveState =
  createFeatureSelector<LeaveState>('leave');

export const selectLeaveSummary = createSelector(
  selectLeaveState,
  state => state.summary
);

export const selectLeaveLoading = createSelector(
  selectLeaveState,
  state => state.loading
);

export const selectLeaveError = createSelector(
  selectLeaveState,
  state => state.error
);

export const selectLeaveSuccessMessage = createSelector(
  selectLeaveState,
  state => state.successMessage
);
