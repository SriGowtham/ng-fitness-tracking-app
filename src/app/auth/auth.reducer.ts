import { Action } from '@ngrx/store';
import { AUTHENTICATED, UN_AUTHENTICATED } from './auth.action';

export interface State {
  isAuth: boolean;
}

const initialState: State = {
  isAuth: false,
};

export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        isAuth: true,
      };
      case UN_AUTHENTICATED:
        return {
            isAuth: false
        }
      default:{
        return state
      }
    }
}

export const getIsAuthenticated = (state: State) => state.isAuth
