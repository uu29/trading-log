import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { IMainState } from "./interface";

export const initialState: IMainState = {
  search_query: "",
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
    setSearchQuery(state, action: PayloadAction<string>) {
      state.search_query = action.payload;
    },
  },
});

export default mainSlice.reducer;
