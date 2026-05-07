import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DepartmentInfoComponent } from './features/department/department-info.component';
import { PersonelCreateComponent } from './features/personel/personel-create/personel-create.component';
import { PersonelListComponent } from './features/personel/personel-list/personel-list.component';
import { ManagerCreateComponent } from './features/personel/manager-create/manager-create.component';
import { LeavePageComponent } from './features/leaves/leave-page.component';
import { LeaveListComponent } from './features/leaves-list/leave-list.component';
import { LoginComponent } from './features/login/login-component';
import {PersonelinfoComponent} from './features/personelinfo/personelinfo-component';
import { ManagerPanelComponent } from './features/manager-panel/manager-panel.component';
import { PersonelPanelComponent } from './features/personel-panel/personel-panel.component';
import {ManagerinfoComponent} from './features/managerinfo/managerinfo-component';
import {PendingLeavesListComponent} from './features/pending-leaves-list/pending-leaves-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'departments/create', component: DepartmentInfoComponent },
  { path: 'personels/create', component: PersonelCreateComponent },
  { path: 'personels/list', component: PersonelListComponent },
  { path: 'manager/create', component: ManagerCreateComponent },

  {
    path: 'personel',
    component: PersonelPanelComponent,
    children: [
      { path: 'bilgilerim', component: PersonelinfoComponent },
      { path: 'izin-talebi', component: LeavePageComponent },
      { path: 'izin-gecmisi', component: LeaveListComponent },
      { path: '', redirectTo: 'bilgilerim', pathMatch: 'full' }
    ]
  },
  {
    path: 'manager',
    component: ManagerPanelComponent,
    children: [
      { path: 'bilgilerim', component: ManagerinfoComponent },
      { path: 'izin-talepleri', component: PendingLeavesListComponent },
      { path: '', redirectTo: 'bilgilerim', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
