import { createAction, props } from '@ngrx/store';
import { PersonelInfoModel } from '../../core/models/personel';

export const getAllPersonelsByDepartmentId = createAction(
  '[Department] Get All Personels By Department Id',
  props<{ departmentId: number }>()
);

export const getAllPersonelsByDepartmentIdSuccess = createAction(
  '[Department] Get All Personels By Department Id Success',
  props<{ personelList: PersonelInfoModel[] }>()
);

export const getAllPersonelsByDepartmentIdFailure = createAction(
  '[Department] Get All Personels By Department Id Failure',
  props<{ error: string }>()
);

export const updateTheManager=createAction("Update The Manager",props<{personelId:number}>())
