import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"

export interface IExercise {
    title: string
    musclesWorked: Array<string>
}

export interface ExerciseChoice {
    exercise: IExercise
    volume: number
}

export interface ExercisePackage {
    id: number
    package: ExerciseChoice
}

export interface ExerciseState {
    exerciseList: Array<ExercisePackage>
}

const initialState: ExerciseState = {
    exerciseList: []
}

export const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ExerciseChoice>) => {
            state.exerciseList.push({
                id: state.exerciseList.length + 1,
                package: {
                    exercise: action.payload.exercise,
                    volume: action.payload.volume
                }
            });
            console.log(state.exerciseList);
        },
        remove: (state, action: PayloadAction<number>) => {
            state.exerciseList = state.exerciseList.filter(e => e.id !== action.payload)
        }
    }
})

export const { add, remove } = exerciseSlice.actions;

export const selectExercise = (state: RootState) => state.exercise.exerciseList;

export default exerciseSlice.reducer;


