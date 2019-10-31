import { RootAction, RootState } from "../store";
import { Reducer } from "redux";

export interface UserState {
  name?: string;
  email?: string;
  imageUrl?: string;
}

const INITIAL_STATE: UserState = {
  name: undefined,
  email: undefined,
  imageUrl: undefined
};

const user: Reducer<UserState, RootAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        name: action.newName,
        email: action.newEmail,
        imageUrl: action.newProfileUrl
      };

    case "CLEAR_USER":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default user;

export function userNameSelector(state: RootState): string {
  if (!state.user || !state.user.name) {
    return "";
  }

  return state.user.name;
}

export function userEmailSelector(state: RootState): string {
  if (!state.user || !state.user.email) {
    return "";
  }

  return state.user.email;
}
