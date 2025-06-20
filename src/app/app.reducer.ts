import { ActionReducerMap, createFeature, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromUI from '../app/shared/ui.reducer'
import { createPlatformFactory } from '@angular/core'

export interface State {
  ui :  fromUI.State
}

export const appReducer: ActionReducerMap<State> = {
  ui : fromUI.uiReducer
}

export const getStateUI = createFeatureSelector<fromUI.State>('ui')
export const getIsLoading =  createSelector(getStateUI, state =>  state.isLoading)