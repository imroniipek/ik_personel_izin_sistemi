import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonelService } from '../../core/services/personel-service';
import * as PersonelInfoActions from './personelinfo-action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class PersonelInfoEffects {

  private actions$ = inject(Actions);
  private personelService = inject(PersonelService);

  getThePersonelInfoEffect = createEffect(() =>
    this.actions$.pipe(

      ofType(PersonelInfoActions.getThePersonelInfo),

      switchMap(({ personelId }) =>
        this.personelService.getThePersonel(personelId).pipe(

          map((personelInfo) =>
            PersonelInfoActions.getPersonelInfoSuccess({
              personel: personelInfo
            })
          ),

          catchError((error) =>
            of(
              PersonelInfoActions.getPersonelInfoError({
                error: error.error.detail ?? 'Personel bilgisi alınamadı'
              })
            )
          )

        )
      )

    )
  );
}
