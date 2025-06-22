import { Training } from './training.modal';
import * as fromRoot from '../app.reducer';
import {
  AVAILABLE_EXCERSISES,
  FINISHED_EXCERSISES,
  START_EXCERSISE,
  STOP_EXCERSISE,
  TrainingAction,
} from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  finishedExcersises: Training[];
  availableExcersises: Training[];
  activeExcersise: Training;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  finishedExcersises: [],
  availableExcersises: [],
  activeExcersise: null,
};

export function trainingReducer(state = initialState, action: TrainingAction) {
  switch (action.type) {
    case FINISHED_EXCERSISES:
      return {
        ...state,
        finishedExcersises: action.payload,
      };
    case AVAILABLE_EXCERSISES:
      return {
        ...state,
        availableExcersises: action.payload,
      };
    case START_EXCERSISE:
      return {
        ...state,
        activeExcersise: action.payload,
      };
    case STOP_EXCERSISE:
      return {
        ...state,
        activeExcersise: null,
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')
export const getFinishedExcersises = createSelector( getTrainingState , state =>
  state.finishedExcersises)
export const getAvailableExcersises = createSelector( getTrainingState , state =>
  state.availableExcersises)
export const getActiveExcersise = createSelector( getTrainingState , state =>
  state.activeExcersise)

