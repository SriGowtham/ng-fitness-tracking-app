import { ActionReducerMap, createFeature, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromUI from '../app/shared/ui.reducer'
import * as fromAuth from '../app/auth/auth.reducer'

export interface State {
  ui :  fromUI.State,
  auth: fromAuth.State
}

export const appReducer: ActionReducerMap<State> = {
  ui : fromUI.uiReducer,
  auth: fromAuth.authReducer
}

export const getStateUI = createFeatureSelector<fromUI.State>('ui')
export const getIsLoading =  createSelector(getStateUI, state =>  state.isLoading)

export const getStateAuth = createFeatureSelector<fromAuth.State>('auth')
export const getIsAuth =  createSelector(getStateAuth, state =>  state.isAuth)