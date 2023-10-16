import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"

export interface bodyFrameState {
    highlighted: Array<string>
    toggle: boolean
}

const initialState: bodyFrameState = {
    highlighted: [],
    toggle: true
}

export const bodyFrameSlice = createSlice({
    name: "bodyFrame",
    initialState,
    reducers: {
        save: (state, action: PayloadAction<Array<string>>) => {
            state.highlighted = action.payload;
        },
        toggle: (state, action: PayloadAction<boolean>) => {
            state.toggle = action.payload;
        }
    }
})

export const { save, toggle } = bodyFrameSlice.actions;

export const selectBodyFrameHighlighted = (state: RootState) => state.bodyFrame.highlighted;
export const selectBodyFrameToggle = (state: RootState) => state.bodyFrame.toggle;

export default bodyFrameSlice.reducer;


