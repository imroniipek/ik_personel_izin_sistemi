
import {createReducer, on} from '@ngrx/store';
import * as PersonelInfoAction from './personelinfo-action';
import {PersonelInfoModel} from '../../core/models/personel';
export interface PersonelInfo
{
  success:boolean
  failure:boolean;
  personel:PersonelInfoModel|null;
  error:string|null;
}
export const initialState: PersonelInfo = {
  success:false,
  failure:false,
  personel:null,
  error:''
}
export const PersonelInfoReducer=createReducer(

  initialState,
  on(PersonelInfoAction.getThePersonelInfo,(state)=>({
    ...state,
    failure:false,
    success:true,
    error:''
  })),
  on(PersonelInfoAction.getPersonelInfoSuccess,(state,{personel})=>({
    ...state,
    success:true,
    failure:false,
    error:'',
    personel:personel
  })),
  on(PersonelInfoAction.getPersonelInfoError,(state,{error})=>({

    ...state,
    success:false,
    error:error,
    failure:true,
})),
)
