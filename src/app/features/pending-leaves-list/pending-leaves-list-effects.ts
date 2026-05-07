import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { PersonelService } from '../../core/services/personel-service';
import { LeaveService } from '../../core/services/leave-service';
import * as PendingLeavesListActions from './pending-leaves-list.action';

@Injectable()
export class PendingLeavesListEffects {

  private actions$ = inject(Actions);
  private personelService = inject(PersonelService);
  private leaveService = inject(LeaveService);

  getPendingLeavesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingLeavesListActions.getPendingLeavesList),

      switchMap(({ managerId }) =>
        this.personelService.getPersonelsPendingList(managerId).pipe(

          map((data) =>
            PendingLeavesListActions.getPendingLeavesListSuccess({ data })
          ),

          catchError((error) =>
            of(PendingLeavesListActions.getPendingLeavesListFailure({
              error: error.message
            }))
          )
        )
      )
    )
  );

  updatePendingLeaveStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingLeavesListActions.updatePendingLeaveStatus),

      switchMap(({ leaveId, request, managerId }) =>
        this.leaveService.updateTheLeave(leaveId, request).pipe(

          map(() =>
            PendingLeavesListActions.updatePendingLeaveStatusSuccess({
              managerId
            })
          ),

          catchError((error) =>
            of(PendingLeavesListActions.updatePendingLeaveStatusFailure({
              error: error.message
            }))
          )
        )
      )
    )
  );

  reloadPendingLeavesAfterUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingLeavesListActions.updatePendingLeaveStatusSuccess),

      map(({ managerId }) =>
        PendingLeavesListActions.getPendingLeavesList({
          managerId
        })
      )
    )
  );
}
