import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { LeaveService } from '../../core/services/leave-service';
import * as LeaveActions from './leave-action';

@Injectable()
export class LeaveEffects {

  private actions$ = inject(Actions);
  private leaveService = inject(LeaveService);

  loadLeaveSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveActions.loadLeaveSummary),
      switchMap(({ personelId }) =>
        this.leaveService.getLeaveSummaryByPersonelId(personelId).pipe(
          map(summary =>
            LeaveActions.loadLeaveSummarySuccess({ summary })
          ),
          catchError((error) =>
          {
            console.log('API HATASI:', error);
            var k=error;
            return of(LeaveActions.loadLeaveSummaryFailure({
              error: error.error?.detail ?? 'İzin bilgileri alınamadı'
            }));
          })
        )
      )
    )
  );
  createLeave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveActions.createLeave),
      mergeMap(({ request }) =>
        this.leaveService.createLeave(request).pipe(
          map(leave =>
            LeaveActions.createLeaveSuccess({ leave })
          ),
          catchError((error) =>
            of(LeaveActions.createLeaveFailure({
              error: error.error?.detail ?? 'İzin oluşturulamadı'
            }))
          )
        )
      )
    )
  );

  reloadSummaryAfterCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveActions.createLeaveSuccess),
      map(({ leave }) =>
        LeaveActions.loadLeaveSummary({
          personelId: leave.personelId
        })
      )
    )
  );
}
