import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

export interface StorageMenuState {
    toggleMenu: boolean
    toggleSave: boolean
    toggleLoad: boolean
}

const initialState: StorageMenuState = {
    toggleMenu: false,
    toggleSave: false,
    toggleLoad: false
}

export const storageMenuSlice = createSlice({
    name: "storageMenu",
    initialState,
    reducers: {
        toggleMenu: (state, action: PayloadAction<boolean>) => {
            state.toggleMenu = action.payload;
        },
        toggleSave: (state, action: PayloadAction<boolean>) => {
            state.toggleSave = action.payload;
        },
        toggleLoad: (state, action: PayloadAction<boolean>) => {
            state.toggleLoad = action.payload;
        },
    }
})

export const { toggleMenu, toggleSave, toggleLoad } = storageMenuSlice.actions;

export const selectStorageMenuToggleMenu = (state: RootState) => state.storageMenu.toggleMenu;
export const selectStorageMenuToggleSave = (state: RootState) => state.storageMenu.toggleSave;
export const selectStorageMenuToggleLoad = (state: RootState) => state.storageMenu.toggleLoad;

export default storageMenuSlice.reducer;