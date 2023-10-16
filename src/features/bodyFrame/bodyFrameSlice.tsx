import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"

export interface bodyFrameState {
    highlighted: Array<string>
}

const initialState: bodyFrameState = {
    highlighted: []
}

export const bodyFrameSlice = createSlice({
    name: "bodyFrame",
    initialState,
    reducers: {
        save: (state, action: PayloadAction<Array<string>>) => {
            state.highlighted = action.payload;
        }
    }
})

export const { save } = bodyFrameSlice.actions;

export const selectBodyFrame = (state: RootState) => state.bodyFrame.highlighted;

export default bodyFrameSlice.reducer;


