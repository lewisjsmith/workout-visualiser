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
import { useState, useEffect } from "react";

export function StorageMenu() {

    const showState = useAppSelector(selectStorageMenuToggleMenu);
    const showSave = useAppSelector(selectStorageMenuToggleSave);
    const showLoad = useAppSelector(selectStorageMenuToggleLoad);
    const currentWorkout = useAppSelector(selectExercise);
    const dispatch = useAppDispatch();

    const [saveName, setSaveName] = useState<string>("");
    const [workoutList, setWorkoutList] = useState<string[]>([""]);

    useEffect(() => {
        const workouts = getWorkoutList();
        setWorkoutList(workouts);
    }, [])

    function saveWorkout(name: string, workout: Array<ExercisePackage>) {
        localStorage.setItem(name, JSON.stringify(workout))
    }

    function loadWorkout(name: string) {
        const loadedWorkout = localStorage.getItem(name)
        loadedWorkout ? dispatch(set(JSON.parse(loadedWorkout))) : {}
    }

    function deleteWorkout(name: string) {
        localStorage.removeItem(name);
        const workouts = getWorkoutList();
        if (workouts.length > 0) {
            setWorkoutList(workouts);
        } else {
            setWorkoutList([]);
        }

    }

    function successfulSave() {
        saveWorkout(saveName, currentWorkout)
        dispatch(toggleMenu(false))
        dispatch(toggleSave(false))
        dispatch(toggleLoad(false))
        const workouts = getWorkoutList();
        if (workouts.length > 0) {
            setWorkoutList(workouts);
        } else {
            setWorkoutList([]);
        }
    }

    function successfulLoad(work: string | null) {
        if (work) {
            loadWorkout(work)
            dispatch(toggleMenu(false))
            dispatch(toggleSave(false))
            dispatch(toggleLoad(false))
        }
    }

    function getWorkoutList() {

        const workouts: string[] = []

        for (let i = 0; i < localStorage.length; i++) {

            const item = localStorage.key(i);

            if (item) {
                workouts.push(item);
            }
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
                        <form action="" onSubmit={(e) => { e.preventDefault() }} style={{ display: "flex", flexWrap: "nowrap", gap: "1rem" }}>
                            <input name="workout-name" type="text" onChange={(e) => setSaveName(e.target.value)} required maxLength={13} />
                            <button onClick={() => {
                                saveName.length > 0 ?
                                    successfulSave()
                                    : {}
                            }}>Save</button>
                        </form>
                    </div>

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

                {workoutList.length > 0 && <ul>

                    {workoutList.map(work => {
                        return (
                            <li key={work}>
                                {work}
                                <button onClick={() => {
                                    work ? successfulLoad(work) : {}
                                }}>Load</button>
                                <button onClick={() => {
                                    work ? deleteWorkout(work) : {}
                                }}>Delete</button>
                            </li>);
                    })}

                </ul>}

                {workoutList.length === 0 && <span style={{
                    position: "relative",
                    top: "3rem"
                }}>No workouts found.</span>}


            </div>
        </div>

    )
}