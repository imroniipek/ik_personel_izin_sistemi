import { PersonelInfoModel } from '../../core/models/personel';
import { createReducer, on } from '@ngrx/store';
import * as AllUpdateManagerActions from './update-the-manager-actions';

export interface UpdatedManager {
  loading: boolean;
  success: boolean;
  failure: boolean;
  error: string;
  personelList: PersonelInfoModel[];
  theManagerId: number;
}

export const initialState: UpdatedManager = {
  loading: false,
  success: false,
  failure: false,
  error: '',
  personelList: [],
  theManagerId: 0,
};

export const updatedManagerReducer = createReducer(
  initialState,

  on(AllUpdateManagerActions.getAllPersonelsByDepartmentId, (state) => ({
    ...state,
    loading: true,
    success: false,
    failure: false,
    error: ''
  })),

  on(AllUpdateManagerActions.getAllPersonelsByDepartmentIdSuccess, (state, { personelList }) => ({
    ...state,
    loading: false,
    success: true,
    failure: false,
    personelList: personelList
  })),

  on(AllUpdateManagerActions.getAllPersonelsByDepartmentIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    failure: true,
    error: error
  })),

  on(AllUpdateManagerActions.updateTheManager,(state,{personelId})=>({

    ...state,
    loading: false,
    success: false,
    failure: true,
    theManagerId:personelId,
  }))






);

