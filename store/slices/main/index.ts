import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { IMainState } from "./interface";

export const initialState: IMainState = {
  selected_trading_date: "",
};

/**
 * 용어 변경
 * loading -> pending
 * success -> fulfilled
 * failure -> rejected
 */

export const mainSlice = createSlice({
  name: FeatureKey.main,
  initialState,
  reducers: {
    setSelecetedTradingDate(state, action: PayloadAction<string>) {
      state.selected_trading_date = action.payload;
    },
  },
});

export default mainSlice.reducer;
