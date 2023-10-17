import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import exerciseReducer from "../features/exercise/exerciseSlice"
import bodyFrameReducer from "../features/bodyFrame/bodyFrameSlice"
import storageMenuReducer from "../features/storageMenu/storageMenuSlice"

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
    bodyFrame: bodyFrameReducer,
    storageMenu: storageMenuReducer
  }
})

// saving between refreshes needed

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
