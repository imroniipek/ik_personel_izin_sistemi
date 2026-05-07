import { Leave } from '../../core/models/leave/leave';
import { createReducer, on } from '@ngrx/store';
import * as LeaveListAction from './leave-list.action';


export interface GetListStatus {
  count: number;
  totalCountList: number;
  success: boolean;
  failure: boolean;
  data: Leave[];
  error: string | null;
}

export const initialState: GetListStatus = {
  count: 0,
  totalCountList: 0,
  success: false,
  failure: false,
  data: [],
  error: null
};

export const LeaveListReducer = createReducer(
  initialState,

  on(LeaveListAction.GetAcceptedLeaveListAction, (state) => ({
    ...state,
    success: false,
    failure: false,
    error: null
  })),

  on(LeaveListAction.GetLeaveListSuccessAction, (state, { leave }) => ({
    ...state,
    data: leave.leavesList,
    count: leave.leavesList.length,
    success: true,
    failure: false,
    error: null
  })),

  on(LeaveListAction.GetLeaveListFailureAction, (state, { error }) => ({
    ...state,
    success: false,
    failure: true,
    data:[],
    error
  })),

  on(LeaveListAction.GetTotalLeaveCountSuccessAction, (state, { totalCount }) => ({
    ...state,
    totalCountList: totalCount
  }))
);
