import { createReducer, on } from '@ngrx/store';
import { LeaveSummary } from '../../core/models/leave/leave-summary';
import * as LeaveActions from './leave-action';

export interface LeaveState {
  summary: LeaveSummary | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialState: LeaveState = {
  summary: null,
  loading: false,
  error: null,
  successMessage: null
};

export const leaveReducer = createReducer(
  initialState,

  on(LeaveActions.loadLeaveSummary, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(LeaveActions.loadLeaveSummarySuccess, (state, { summary }) => ({
    ...state,
    summary,
    loading: false,
    error: null
  })),

  on(LeaveActions.loadLeaveSummaryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(LeaveActions.createLeave, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null
  })),

  on(LeaveActions.createLeaveSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
    successMessage: 'İzin başarıyla oluşturuldu'
  })),

  on(LeaveActions.createLeaveFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    successMessage: null
  }))
);
