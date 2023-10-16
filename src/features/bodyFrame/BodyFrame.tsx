import { useAppSelector } from "../../app/hooks";
import {
    ExercisePackage,
    selectExercise
} from "../exercise/exerciseSlice";
import { selectBodyFrame } from "./bodyFrameSlice";

import { useState, useEffect } from "react";

import abs from "../../assets/Abs.png";
import base from "../../assets/Base.png";
import biceps from "../../assets/Biceps.png";
import obliques from "../../assets/Obliques.png";
import pectorals from "../../assets/Pectorals.png";
import quadriceps from "../../assets/Quadriceps.png";
import shoulders from "../../assets/Shoulders.png";

export default function BodyFrame() {

    const exerciseList = useAppSelector(selectExercise);
    const highlighted = useAppSelector(selectBodyFrame);

    const [absLevel, setAbsLevel] = useState<number>(0);
    const [bicepsLevel, setBicepsLevel] = useState<number>(0);
    const [obliquesLevel, setObliquesLevel] = useState<number>(0);
    const [pectoralsLevel, setPectoralsLevel] = useState<number>(0);
    const [quadricepsLevel, setQuadricepsLevel] = useState<number>(0);
    const [shouldersLevel, setShouldersLevel] = useState<number>(0);

    useEffect(() => {
        {
            let absTemp = 0
            let bicepsTemp = 0
            let obliquesTemp = 0
            let pectoralsTemp = 0
            let quadricepsTemp = 0
            let shouldersTemp = 0

            exerciseList.map((exercise: ExercisePackage) => {
                if (exercise.package.exercise.musclesWorked.includes("abs")) {
                    absTemp = (absTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("abs") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("biceps")) {
                    bicepsTemp = (bicepsTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("biceps") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("obliques")) {
                    obliquesTemp = (obliquesTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("obliques") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("chest")) {
                    pectoralsTemp = (pectoralsTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("chest") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("quadriceps")) {
                    quadricepsTemp = (quadricepsTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("quadriceps") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("shoulders")) {
                    shouldersTemp = (shouldersTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("shoulders") + 1)));
                }
            })

            setAbsLevel(absTemp);
            setBicepsLevel(bicepsTemp);
            setObliquesLevel(obliquesTemp);
            setPectoralsLevel(pectoralsTemp);
            setQuadricepsLevel(quadricepsTemp);
            setShouldersLevel(shouldersTemp);
        }

    }, [exerciseList])

    function getHighlightPriority(arr: string[], value: string) {
        switch (arr.indexOf(value) + 1) {
            case (1):
                return "layer-highlighted-high";
                break;
            case (2):
                return "layer-highlighted-medium";
                break;
            case (3):
                return "layer-highlighted-low";
                break;
            default:
                break;
        }
    }

    return (
        <div className="body-frame">
            <img src={base} alt="" className="base" />

            {absLevel > 0 && <img src={abs} alt="" className="layer" style={{ opacity: `${absLevel * 10}%` }} />}
            {bicepsLevel > 0 && <img src={biceps} alt="" className="layer" style={{ opacity: `${bicepsLevel * 10}%` }} />}
            {obliquesLevel > 0 && <img src={obliques} alt="" className="layer" style={{ opacity: `${obliquesLevel * 10}%` }} />}
            {pectoralsLevel > 0 && <img src={pectorals} alt="" className="layer" style={{ opacity: `${pectoralsLevel * 10}%` }} />}
            {quadricepsLevel > 0 && <img src={quadriceps} alt="" className="layer" style={{ opacity: `${quadricepsLevel * 10}%` }} />}
            {shouldersLevel > 0 && <img src={shoulders} alt="" className="layer" style={{ opacity: `${shouldersLevel * 10}%` }} />}

            {highlighted &&
                <div>
                    {highlighted.includes("abs") ? <img src={abs} alt="" className={getHighlightPriority(highlighted, "abs")} /> : null}
                    {highlighted.includes("biceps") ? <img src={biceps} alt="" className={getHighlightPriority(highlighted, "biceps")} /> : null}
                    {highlighted.includes("obliques") ? <img src={obliques} alt="" className={getHighlightPriority(highlighted, "obliques")} /> : null}
                    {highlighted.includes("chest") ? <img src={pectorals} alt="" className={getHighlightPriority(highlighted, "chest")} /> : null}
                    {highlighted.includes("quadriceps") ? <img src={quadriceps} alt="" className={getHighlightPriority(highlighted, "quadriceps")} /> : null}
                    {highlighted.includes("shoulders") ? <img src={shoulders} alt="" className={getHighlightPriority(highlighted, "shoulders")} /> : null}
                </div>
            }
        </div>
    )
}