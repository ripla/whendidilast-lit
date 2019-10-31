import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "../store";

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

export interface UserActionSetUser extends Action<"SET_USER"> {
  newName: string;
  newEmail: string;
  newProfileUrl: string;
}

export interface UserActionClearUser extends Action<"CLEAR_USER"> {}

export type UserAction = UserActionSetUser | UserActionClearUser;

type ThunkResult = ThunkAction<void, RootState, undefined, UserAction>;

const setUserAction = (
  newName: string,
  newEmail: string,
  newProfileUrl: string
) => {
  const newAction: UserActionSetUser = {
    type: SET_USER,
    newName,
    newEmail,
    newProfileUrl
  };

  return newAction;
};

export const setUser: ActionCreator<ThunkResult> = (
  name: string,
  email: string,
  profileUrl: string
) => (dispatch: Dispatch) => {
  dispatch(setUserAction(name, email, profileUrl));
};
