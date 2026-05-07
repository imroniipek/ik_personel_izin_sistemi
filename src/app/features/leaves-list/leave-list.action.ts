import {createAction, props} from '@ngrx/store';
import {LeaveListResponse} from '../../core/models/leave/leave';

export const GetAcceptedLeaveListAction=createAction('[Leave] GetAcceptedLeaveList',props<{personelId:number}>());

export const GetRejectedLeaveListAction=createAction('[Leave] GetRejectedLeaveList',props<{personelId:number}>());

export const GetPendingLeaveListAction=createAction('[Leave] GetPendingLeaveList',props<{personelId:number}>())

export const GetLeaveListSuccessAction = createAction('[Leave] Get Accepted Leave List Success', props<{ leave: LeaveListResponse }>());

export const GetLeaveListFailureAction = createAction('[Leave] Get Accepted Leave List Failure', props<{ error: string }>());

export const GetTotalLeaveCountAction = createAction('[LeaveList] Get Total Leave Count', props<{ personelId: number }>());

export const GetTotalLeaveCountSuccessAction = createAction('[LeaveList] Get Total Leave Count Success', props<{ totalCount: number }>());
