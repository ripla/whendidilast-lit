import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "../store";

export const UPDATE_OFFLINE = "UPDATE_OFFLINE";

export interface AppActionUpdateOffline extends Action<"UPDATE_OFFLINE"> {
  offline: boolean;
}

export type AppAction = AppActionUpdateOffline;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

const openAppAction: ActionCreator<AppActionUpdateOffline> = (
  offline: boolean
) => {
  return {
    type: UPDATE_OFFLINE,
    offline
  };
};

export function openApp(offline: boolean): ActionCreator<void> {
  return function(dispatch): void {
    dispatch(openAppAction(offline));
  };
}
