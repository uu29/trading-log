import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import main from "./main";
import { IMainState } from "./main/interface";

export interface State {
  main: IMainState;
}

const rootReducer = (state: State | undefined, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        main,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
