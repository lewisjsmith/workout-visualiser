import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    add,
    remove,
    selectExercise,
    IExercise
} from "./exerciseSlice";
import { save, toggle, selectBodyFrameToggle } from "../bodyFrame/bodyFrameSlice";
import { toggleMenu, toggleSave, toggleLoad } from "../storageMenu/storageMenuSlice";
import { useState, useEffect } from "react";
import { exerciseName } from "./lookup";

export function Exercise() {

    const exerciseList = useAppSelector(selectExercise);
    const currentToggle = useAppSelector(selectBodyFrameToggle);
    const dispatch = useAppDispatch();

    const [selectedExercise, setSelectedExercise] = useState<IExercise>({
        title: "shoulder-press",
        musclesWorked: ["shoulders", "chest"]
    });
    const [selectedVolume, setSelectedVolume] = useState<number>(1);
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        dispatch(save(selectedExercise.musclesWorked));
    }, [selectedExercise])

    // musclesWorked are listed in order of intensity.
    function exerciseChange(value: string) {

        const { musclesWorked } = { ...exerciseName[value] };

        setSelectedExercise({
            title: value,
            musclesWorked: musclesWorked
        })
        
    }

    function volumeIntToString(value: number) {
        switch (value) {
            case (1):
                return "Low";
            case (2):
                return "Medium";
            case (3):
                return "High";
            default:
                return "Error";
        }
    }

    function exerciseListToUrl() {
        const n = exerciseList.length;

        const currentUrl = window.location.href;
        const preQuery = currentUrl.split("?")[0];

        let query = ""

        if (n > 0) {

            query = query + "?plan=";

            for (let i = 0; i < n; i++) {
                const name: keyof typeof exerciseName = exerciseList[i]["package"]["exercise"]["title"];
                const volume = exerciseList[i].package.volume;
                const id = exerciseName[name]["id"];
                query = query + `${id}v${volume}`;
            }

        }

        navigator.clipboard.writeText(preQuery + query);
    }

    return (

        <div className="exercise-wrapper">

            <div className="exercise-menu">

                <div>
                    <label htmlFor="exercise-dropdown" style={{ fontWeight: "bold" }}>Exercise: </label>
                    <select name="exercise-dropdown" id="" onChange={e => exerciseChange(e.target.value)} defaultValue={"shoulder-press"}>
                        <option value="shoulder-press">Shoulder Press</option>
                        <option value="barbell-squat">Barbell Squat</option>
                        <option value="bench-press">Bench Press</option>
                        <option value="bent-over-row">Bent-Over Row</option>
                        <option value="calf-raises">Calf Raises</option>
                        <option value="chin-up">Chin Up</option>
                        <option value="deadlift">Deadlift</option>
                        <option value="face-pull">Face Pull</option>
                        <option value="farmers-walk">Farmers Walk</option>
                        <option value="glute-bridge">Glute Bridge</option>
                        <option value="goblet-squat">Goblet Squat</option>
                        <option value="hammer-curl">Hammer Curl</option>
                        <option value="hip-thrust">Hip Thrust</option>
                        <option value="kettle-bell-swing">Kettle-Bell Swing</option>
                        <option value="lateral-raise">Lateral Raise</option>
                        <option value="leg-extension">Leg Extension</option>
                        <option value="lunge">Lunge</option>
                        <option value="pull-up">Pull Up</option>
                        <option value="push-up">Push Up</option>
                        <option value="side-plank">Side Plank</option>
                        <option value="sit-up">Sit Up</option>
                        <option value="tricep-extension">Tricep Extension</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="volume-dropdown" style={{ fontWeight: "bold" }}>Volume: </label>
                    <select name="volume-dropdown" id="" onChange={e => setSelectedVolume(parseInt(e.target.value))} defaultValue={1}>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                    </select>
                </div>


                <button onClick={() => {
                    dispatch(add({
                        exercise: selectedExercise,
                        volume: selectedVolume
                    }
                    ))
                }}>Add</button>
            </div>

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "0.5rem" }}>
                    <span>Exercise Preview: </span>
                    <input type="checkbox" defaultChecked onChange={(e) => { dispatch(toggle(!currentToggle)) }} />
                </div>

                <button className={copied ? "copied" : ""} onClick={() => {
                    exerciseListToUrl();
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 5000)
                }}>{copied ? "Copied!" : "Share"}</button>

                <button onClick={() => {
                    dispatch(toggleMenu(true))
                    dispatch(toggleSave(true))
                }}>Save</button>
                <button onClick={() => {
                    dispatch(toggleMenu(true))
                    dispatch(toggleLoad(true))
                }}>Load</button>
            </div>


            <ul className="exercise-list">
                <li><span style={{ fontWeight: "bold" }}>Exercise</span><span style={{ fontWeight: "bold" }}>Volume</span></li>
                {exerciseList.map(ex => {
                    return <li key={ex.id}>
                        <span style={{textTransform: "capitalize"}}>{ex.package.exercise.title.split("-").join(" ")}</span>
                        <span>{volumeIntToString(ex.package.volume)}</span>
                        <button onClick={() => {
                            dispatch(remove(ex.id))
                        }}>Remove</button>
                    </li>
                })}
            </ul>

        </div>
    )
}