import {createReducer, on} from '@ngrx/store';
import * as ManagerInfoAction from './managerinfo-action';
import {PersonelInfoModel} from '../../core/models/personel';
export interface ManagerInfo
{
  success:boolean
  failure:boolean;
  personel:PersonelInfoModel|null;
  error:string|null;
}
export const initialState: ManagerInfo = {
  success:false,
  failure:false,
  personel:null,
  error:''
}
export const  ManagerInfoReducer=createReducer(

  initialState,
  on(ManagerInfoAction.getManagerInfo,(state)=>({
    ...state,
    failure:false,
    success:true,
    error:''
  })),
  on(ManagerInfoAction.getManagerInfoSuccess,(state,{personel})=>({
    ...state,
    success:true,
    failure:false,
    error:'',
    personel:personel
  })),
  on(ManagerInfoAction.getManagerInfoError,(state,{error})=>({
    ...state,
    success:false,
    error:error,
    failure:true,
  })),
)
