import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LeaveService } from '../../core/services/leave-service';
import {catchError, forkJoin, map, of, switchMap} from 'rxjs';
import * as LeaveListActions from './leave-list.action';

@Injectable()
export class LeaveListEffects {
  private actions = inject(Actions);
  private leaveService = inject(LeaveService);

  getAcceptedLeaveListEffect = createEffect(() =>
    this.actions.pipe(
      ofType(LeaveListActions.GetAcceptedLeaveListAction),

      switchMap(({personelId}) =>
        this.leaveService.getAcceptedLeaveList(personelId).pipe(
          map((leave) => LeaveListActions.GetLeaveListSuccessAction({
            leave: leave
          })),
          catchError((error) =>
            of(
              LeaveListActions.GetLeaveListFailureAction
              ({
                error: error.error.detail ?? 'Accepted leave list alınamadı'
              })
            )
          )
        )
      )
    )
  );
  getRejectedLeaveListEffect = createEffect(() =>
    this.actions.pipe(
      ofType(LeaveListActions.GetRejectedLeaveListAction),

      switchMap(({personelId}) =>
        this.leaveService.getRejectedLeaveList(personelId).pipe(
          map((leave) =>
            LeaveListActions.GetLeaveListSuccessAction({leave})
          ),
          catchError((error) =>
            of(
              LeaveListActions.GetLeaveListFailureAction({
                error: error.error.detail ?? 'Rejected leave list alınamadı'
              })
            )
          )
        )
      )
    )
  );
  getPendingLeaveListEffect = createEffect(() =>
    this.actions.pipe(
      ofType(LeaveListActions.GetPendingLeaveListAction),

      switchMap(({ personelId }) =>
        this.leaveService.getPendingLeaveList(personelId).pipe(
          map((leave) =>
            LeaveListActions.GetLeaveListSuccessAction({leave})
          ),

          catchError((error) =>
            of(
              LeaveListActions.GetLeaveListFailureAction({
                error: error.error.detail ?? 'Pending Leave List Failure'
              })
            )
          )
        )
      )
    )
  );

  getTotalLeaveCountEffect = createEffect(() =>
    this.actions.pipe(
      ofType(LeaveListActions.GetTotalLeaveCountAction),

      switchMap(({ personelId }) =>
        forkJoin({
          accepted: this.leaveService.getAcceptedLeaveList(personelId),
          pending: this.leaveService.getPendingLeaveList(personelId)
        }).pipe(
          map(({ accepted, pending }) =>
            LeaveListActions.GetTotalLeaveCountSuccessAction({
              totalCount: accepted.countList + pending.countList
            })
          ),

          catchError((error) =>
            of(
              LeaveListActions.GetLeaveListFailureAction({
                error: error.error?.detail ?? 'Toplam izin sayısı hesaplanamadı'
              })
            )
          )
        )
      )
    )
  );

}
