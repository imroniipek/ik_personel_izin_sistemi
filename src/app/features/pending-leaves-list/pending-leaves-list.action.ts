import { createAction, props } from '@ngrx/store';
import { PendingLeaveInfo } from '../../core/models/leave/pending-leaves-info';
import { UpdateLeaveRequest } from '../../core/models/leave/leave';

export const getPendingLeavesList = createAction(
  '[Leave] Get Pending Leaves',
  props<{ managerId: number }>()
);

export const getPendingLeavesListSuccess = createAction(
  '[Leave] Get Pending Leaves Success',
  props<{ data: PendingLeaveInfo[] }>()
);

export const getPendingLeavesListFailure = createAction(
  '[Leave] Get Pending Leaves Failure',
  props<{ error: any }>()
);

export const updatePendingLeaveStatus = createAction(
  '[Leave] Update Pending Leave Status',
  props<{
    leaveId: number;
    request: UpdateLeaveRequest;
    managerId: number;
  }>()
);

export const updatePendingLeaveStatusSuccess = createAction(
  '[Leave] Update Pending Leave Status Success',
  props<{ managerId: number }>()
);

export const updatePendingLeaveStatusFailure = createAction(
  '[Leave] Update Pending Leave Status Failure',
  props<{ error: any }>()
);
