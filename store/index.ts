import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import slice from "./slices";

// NODE_ENV가 "development"일 경우에만 참
const devMode = process.env.NODE_ENV === "development";

// 커스텀 미들웨어
const firstMiddleware = (store: any) => (next: any) => (action: any) => {
  // console.log("action 로깅", action);
  next(action);
};

// 스토어 생성: configureStore로
const store = configureStore({
  reducer: slice,
  middleware: [firstMiddleware],
  devTools: devMode,
});

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore<EnhancedStore> = (context) => setupStore(context);

const wrapper = createWrapper(makeStore, {
  debug: devMode,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default wrapper;
