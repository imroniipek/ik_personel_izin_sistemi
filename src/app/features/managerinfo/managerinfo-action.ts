import {createAction, props} from '@ngrx/store';
import {PersonelInfoModel} from '../../core/models/personel';

export const getManagerInfo=createAction('[ManagerInfo] Get Personel Info',props<{personelId:number}>());

export const getManagerInfoSuccess=createAction('[ManagerInfo] GetPersonel Info Success',props<{personel:PersonelInfoModel}>());

export const getManagerInfoError=createAction('[ManagerInfo] GetPersonel Info Error',props<{error:string}>());
