import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../store';

export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';

export interface AppActionUpdateOffline extends Action<'UPDATE_OFFLINE'> {offline: boolean};

export type AppAction = AppActionUpdateOffline

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

export const openApp: ActionCreator<ThunkResult> = (offline: boolean) => (dispatch) => {
    dispatch({
      type: UPDATE_OFFLINE,
      offline
    });
};
