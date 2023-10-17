import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    toggleMenu,
    toggleSave,
    toggleLoad,
    selectStorageMenuToggleMenu,
    selectStorageMenuToggleSave,
    selectStorageMenuToggleLoad
} from "./storageMenuSlice";
import {
    ExercisePackage,
    set,
    selectExercise
} from "../exercise/exerciseSlice"
import { useState } from "react";

export function StorageMenu() {

    const showState = useAppSelector(selectStorageMenuToggleMenu);
    const showSave = useAppSelector(selectStorageMenuToggleSave);
    const showLoad = useAppSelector(selectStorageMenuToggleLoad);
    const currentWorkout = useAppSelector(selectExercise);
    const dispatch = useAppDispatch();

    const [saveName, setSaveName] = useState<string>("");

    function saveWorkout(name: string, workout: Array<ExercisePackage>) {
        localStorage.setItem(name, JSON.stringify(workout))
    }

    function loadWorkout(name: string) {
        const loadedWorkout = localStorage.getItem(name)
        loadedWorkout ? dispatch(set(JSON.parse(loadedWorkout))) : {}
    }

    function deleteWorkout(name: string) {
        localStorage.removeItem(name);
    }

    function getWorkoutList() {
        const workouts = []
        for (let i = 0; i < localStorage.length; i++) {
            workouts.push(localStorage.key(i));
        }
        return workouts;
    }

    return (
        <div className="screen-shadow"
            style={showState ? {} : { visibility: "hidden", display: "none" }}>

            <div className="storage-menu-save"
                style={showSave ? {} : { visibility: "hidden", display: "none" }}>
                <h1 className="menu-title">Save</h1>
                <button className="close-btn" onClick={() => {
                    dispatch(toggleMenu(false))
                    dispatch(toggleSave(false))
                    dispatch(toggleLoad(false))
                }}>X</button>
                <div className="save-interface">
                    <div style={{ width: "100%", textAlign: "left" }}>
                        <label htmlFor="workout-name">Workout name:</label>
                    </div>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        gap: "1rem"
                    }}>
                        <input name="workout-name" type="text" onChange={(e) => setSaveName(e.target.value)} />
                        <button onClick={() => {
                            saveName.length > 0 ? saveWorkout(saveName, currentWorkout) : {}
                        }}>Save</button>
                    </div>
                    {/* Add length checks */}

                </div>

            </div>


            <div className="storage-menu-load"
                style={showLoad ? {} : { visibility: "hidden", display: "none" }}>

                <h1 className="menu-title">Load</h1>
                <button className="close-btn" onClick={() => {
                    dispatch(toggleMenu(false))
                    dispatch(toggleSave(false))
                    dispatch(toggleLoad(false))
                }}>X</button>
                {getWorkoutList().length > 0 && <ul>
                    {getWorkoutList().map(work => {
                        return (
                            <li key={work}>
                                {work}
                                <button onClick={() => {
                                    work ? loadWorkout(work) : {}
                                }}>Load</button>
                                <button onClick={() => {
                                    work ? deleteWorkout(work) : {}
                                }}>Delete</button>
                            </li>);
                    })}
                </ul>}
                {getWorkoutList().length === 0 && <span style={{
                    position: "relative",
                    top: "3rem"
                }}>No workouts found.</span>}
            </div>
        </div>

    )
}