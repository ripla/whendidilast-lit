import { Reducer } from "redux";
import { UPDATE_OFFLINE } from "../actions/app";
import { RootAction } from "../store";

export interface AppState {
    offline: boolean;
}

const INITIAL_STATE: AppState = {
    offline: false,
  };

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_OFFLINE:
            return {
                ...state,
                offline: action.offline
            }

        default:
            return state;
    }
}

export default app;