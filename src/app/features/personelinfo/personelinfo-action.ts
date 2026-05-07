import {createAction, props} from '@ngrx/store';
import {PersonelInfoModel} from '../../core/models/personel';

export const getThePersonelInfo=createAction('[PersonelInfo] Get Personel Info',props<{personelId:number}>());

export const getPersonelInfoSuccess=createAction('[PersonelInfo] GetPersonel Info Success',props<{personel:PersonelInfoModel}>());

export const getPersonelInfoError=createAction('[PersonelInfo] GetPersonel Info Error',props<{error:string}>());
