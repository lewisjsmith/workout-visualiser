import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import exerciseReducer from "../features/exercise/exerciseSlice"
import bodyFrameReducer from "../features/bodyFrame/bodyFrameSlice"

function loadLocalStorage() {
  const testStorage = localStorage.getItem("test");
  return JSON.parse(testStorage);
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    exercise: exerciseReducer,
    bodyFrame: bodyFrameReducer
  },
  preloadedState: {
    exercise: {
      exerciseList: loadLocalStorage()
    }
  }
})

// preloadedState

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
