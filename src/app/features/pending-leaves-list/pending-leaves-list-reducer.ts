import { PendingLeaveInfo } from '../../core/models/leave/pending-leaves-info';
import { createReducer, on } from '@ngrx/store';
import * as PendingLeaveListActions from './pending-leaves-list.action';

export interface PendingLeaveListState {
  loading: boolean;
  success: boolean;
  fail: boolean;
  data: PendingLeaveInfo[];
  errorMessage: string | null;
}

export const initialState: PendingLeaveListState = {
  loading: false,
  success: false,
  fail: false,
  data: [],
  errorMessage: null
};

export const pendingLeaveListReducer = createReducer(
  initialState,

  on(PendingLeaveListActions.getPendingLeavesList, (state) => {
    return {
      ...state,
      loading: true,
      success: false,
      fail: false,
      errorMessage: null
    };
  }),

  on(PendingLeaveListActions.getPendingLeavesListSuccess, (state, { data }) => {
    return {
      ...state,
      loading: false,
      success: true,
      fail: false,
      data: data,
      errorMessage: null
    };
  }),

  on(PendingLeaveListActions.getPendingLeavesListFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      success: false,
      fail: true,
      errorMessage: error
    };
  }),

  on(PendingLeaveListActions.updatePendingLeaveStatusFailure, (state, { error }) => {
    return {
      ...state,
      success: false,
      fail: true,
      errorMessage: error
    };
  })
);
