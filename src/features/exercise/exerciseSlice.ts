import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import {v4 as uuidv4} from 'uuid';

export interface IExercise {
    title: string
    musclesWorked: Array<string>
}

export interface ExerciseChoice {
    exercise: IExercise
    volume: number
}

export interface ExercisePackage {
    id: string
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
                id: uuidv4(),
                package: {
                    exercise: action.payload.exercise,
                    volume: action.payload.volume
                }
            });
            console.log(state.exerciseList);
        },
        remove: (state, action: PayloadAction<string>) => {
            state.exerciseList = state.exerciseList.filter(e => e.id !== action.payload)
        }
    }
})

export const { add, remove } = exerciseSlice.actions;

export const selectExercise = (state: RootState) => state.exercise.exerciseList;

export default exerciseSlice.reducer;


