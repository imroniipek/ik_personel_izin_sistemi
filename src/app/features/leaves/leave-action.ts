import { createAction, props } from '@ngrx/store';
import { Leave, CreateLeaveRequest } from '../../core/models/leave/leave';
import { LeaveSummary } from '../../core/models/leave/leave-summary';

export const loadLeaveSummary = createAction(
  '[Leave] Load Leave Summary',
  props<{ personelId: number }>()
);

export const loadLeaveSummarySuccess = createAction(
  '[Leave] Load Leave Summary Success',
  props<{ summary: LeaveSummary }>()
);

export const loadLeaveSummaryFailure = createAction(
  '[Leave] Load Leave Summary Failure',
  props<{ error: string }>()
);

export const createLeave = createAction(
  '[Leave] Create Leave',
  props<{ request: CreateLeaveRequest }>()
);

export const createLeaveSuccess = createAction(
  '[Leave] Create Leave Success',
  props<{ leave: Leave }>()
);

export const createLeaveFailure = createAction(
  '[Leave] Create Leave Failure',
  props<{ error: string }>()
);
