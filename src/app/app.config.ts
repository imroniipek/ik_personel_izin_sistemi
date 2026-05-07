import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { leaveReducer} from './features/leaves/leave-reducer';
import { LeaveEffects} from './features/leaves/leave.effects';
import {LeaveListReducer} from './features/leaves-list/leave-list.reducer';
import {LeaveListEffects} from './features/leaves-list/leave-list.effects';
import {PersonelInfoReducer} from './features/personelinfo/personelinfo-reducer';
import {PersonelInfoEffects} from './features/personelinfo/personelinfo-effects';
import {ManagerInfoEffects} from './features/managerinfo/managerinfo-effects';
import {ManagerInfoReducer} from './features/managerinfo/managerinfo-reducer';
import { pendingLeaveListReducer } from './features/pending-leaves-list/pending-leaves-list-reducer';
import { PendingLeavesListEffects } from './features/pending-leaves-list/pending-leaves-list-effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      leave: leaveReducer,
      leaveList: LeaveListReducer,
      personelInfo: PersonelInfoReducer,
      managerInfo: ManagerInfoReducer,
      pendingLeaveList: pendingLeaveListReducer
    }),
    provideEffects([
      LeaveEffects,
      LeaveListEffects,
      PersonelInfoEffects,
      ManagerInfoEffects,
      PendingLeavesListEffects
    ])
  ]
}
