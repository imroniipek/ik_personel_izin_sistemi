import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonelService } from '../../core/services/personel-service';
import * as ManagerInfoActions from './managerinfo-action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ManagerInfoEffects {

  private actions$ = inject(Actions);
  private personelService = inject(PersonelService);

  getTheManagerInfoEffect = createEffect(() =>
    this.actions$.pipe(

      ofType(ManagerInfoActions.getManagerInfo),

      switchMap(({ personelId }) =>
        this.personelService.getThePersonel(personelId).pipe(

          map((personelInfo) =>
            ManagerInfoActions.getManagerInfoSuccess({
              personel: personelInfo
            })
          ),

          catchError((error) =>
            of(
              ManagerInfoActions.getManagerInfoError({
                error: error.error.detail ?? 'Personel bilgisi alınamadı'
              })
            )
          )

        )
      )

    )
  );
}
