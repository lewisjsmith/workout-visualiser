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

    function exerciseChange(value: string) {
        switch (value) {
            case ("shoulder-press"):
                setSelectedExercise({
                    title: "Shoulder Press",
                    musclesWorked: ["shoulders", "chest"]
                })
                break;
            case ("push-up"):
                setSelectedExercise({
                    title: "Push Up",
                    musclesWorked: ["chest", "shoulders"]
                })
            default:
                break;
        }
    }

    return (

        <div>
            <select name="" id="" onChange={e => exerciseChange(e.target.value)} defaultValue={"shoulder-press"}>
                <option value="shoulder-press">Shoulder Press</option>
                <option value="push-up">Push up</option>
            </select>
            <select name="" id="" onChange={e => setSelectedVolume(parseInt(e.target.value))} defaultValue={1}>
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