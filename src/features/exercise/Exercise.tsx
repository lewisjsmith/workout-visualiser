import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    add,
    remove,
    selectExercise,
    IExercise
} from "./exerciseSlice";
import { useState } from "react";

export function Exercise() {

    const exerciseList = useAppSelector(selectExercise);
    const dispatch = useAppDispatch();

    const [selectedExercise, setSelectedExercise] = useState<IExercise>({
        title: "Shoulder Press",
        musclesWorked: ["shoulders", "chest"]
    });
    const [selectedVolume, setSelectedVolume] = useState<number>(1);

    // musclesWorked are listed in order of intensity.
    function exerciseChange(value: string) {
        switch (value) {
            case ("shoulder-press"):
                setSelectedExercise({
                    title: "Shoulder Press",
                    musclesWorked: ["shoulders", "chest"]
                })
                break;
            case ("sit-up"):
                setSelectedExercise({
                    title: "Sit Up",
                    musclesWorked: ["abs", "", "obliques"]
                })
                break;
            case ("hammer-curl"):
                setSelectedExercise({
                    title: "Hammer Curl",
                    musclesWorked: ["biceps", "forearms"]
                })
                break;
            case ("side-plank"):
                setSelectedExercise({
                    title: "Side Plank",
                    musclesWorked: ["obliques", "abs"]
                })
                break;
            case ("push-up"):
                setSelectedExercise({
                    title: "Push Up",
                    musclesWorked: ["chest", "", "shoulders"]
                })
                break;
            case ("leg-extension"):
                setSelectedExercise({
                    title: "Leg Extension",
                    musclesWorked: ["quadriceps"]
                })
                break;
            // biceps
            // obliques (either side of centre abs)
            // Abs
            // quadriceps
            // calves
            // trapezius
            // triceps
            // lats
            // gluteus
            // hamstrings

            default:
                break;
        }
    }

    return (

        <div>

            <label htmlFor="exercise-dropdown">Exercise: </label>
            <select name="exercise-dropdown" id="" onChange={e => exerciseChange(e.target.value)} defaultValue={"shoulder-press"}>
                <option value="shoulder-press">Shoulder Press</option>
                <option value="sit-up">Sit Up</option>
                <option value="hammer-curl">Hammer Curl</option>
                <option value="side-plank">Side Plank</option>
                <option value="push-up">Push Up</option>
                <option value="leg-extension">Leg Extension</option>
            </select>

            <label htmlFor="volume-dropdown">Volume: </label>
            <select name="volume-dropdown" id="" onChange={e => setSelectedVolume(parseInt(e.target.value))} defaultValue={1}>
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
            </select>

            <button onClick={() => {
                dispatch(add({
                    exercise: selectedExercise,
                    volume: selectedVolume
                }
                ))
            }}>Add</button>

            <h1>{selectedExercise?.title} {selectedExercise?.musclesWorked}</h1>
            <h2>{selectedVolume}</h2>

        </div>
    )
}