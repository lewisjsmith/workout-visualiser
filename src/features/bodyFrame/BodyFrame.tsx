import { useAppSelector } from "../../app/hooks";
import {
    ExercisePackage,
    selectExercise
} from "../exercise/exerciseSlice";
import { selectBodyFrameToggle, selectBodyFrameHighlighted } from "./bodyFrameSlice";

import { useState, useEffect } from "react";

import abs from "../../assets/Abs.png";
import base from "../../assets/Base.png";
import biceps from "../../assets/Biceps.png";
import calves from "../../assets/Calves.png";
import forearms from "../../assets/Forearms.png";
import glutes from "../../assets/Glutes.png";
import hamstrings from "../../assets/Hamstrings.png";
import lats from "../../assets/Lats.png";
import obliques from "../../assets/Obliques.png";
import pectorals from "../../assets/Pectorals.png";
import quadriceps from "../../assets/Quadriceps.png";
import shoulders from "../../assets/Shoulders.png";
import trapezius from "../../assets/Trapezius.png";
import triceps from "../../assets/Triceps.png";

export default function BodyFrame() {

    const exerciseList = useAppSelector(selectExercise);
    const highlighted = useAppSelector(selectBodyFrameHighlighted);
    const toggle = useAppSelector(selectBodyFrameToggle);

    const [absLevel, setAbsLevel] = useState<number>(0);
    const [bicepsLevel, setBicepsLevel] = useState<number>(0);
    const [calvesLevel, setCalvesLevel] = useState<number>(0);
    const [forearmsLevel, setForearmsLevel] = useState<number>(0);
    const [glutesLevel, setGlutesLevel] = useState<number>(0);
    const [hamstringsLevel, setHamstringsLevel] = useState<number>(0);
    const [latsLevel, setLatsLevel] = useState<number>(0);
    const [obliquesLevel, setObliquesLevel] = useState<number>(0);
    const [pectoralsLevel, setPectoralsLevel] = useState<number>(0);
    const [quadricepsLevel, setQuadricepsLevel] = useState<number>(0);
    const [shouldersLevel, setShouldersLevel] = useState<number>(0);
    const [trapeziusLevel, setTrapeziusLevel] = useState<number>(0);
    const [tricepsLevel, setTricepsLevel] = useState<number>(0);

    useEffect(() => {
        {
            let absTemp = 0
            let bicepsTemp = 0
            let calvesTemp = 0
            let forearmsTemp = 0
            let glutesTemp = 0
            let hamstringsTemp = 0
            let latsTemp = 0
            let obliquesTemp = 0
            let pectoralsTemp = 0
            let quadricepsTemp = 0
            let shouldersTemp = 0
            let trapeziusTemp = 0
            let tricepsLevel = 0

            exerciseList.map((exercise: ExercisePackage) => {
                if (exercise.package.exercise.musclesWorked.includes("abs")) {
                    absTemp = (absTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("abs") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("biceps")) {
                    bicepsTemp = (bicepsTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("biceps") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("calves")) {
                    calvesTemp = (calvesTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("calves") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("forearms")) {
                    forearmsTemp = (forearmsTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("forearms") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("glutes")) {
                    glutesTemp = (glutesTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("glutes") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("hamstrings")) {
                    hamstringsTemp = (hamstringsTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("hamstrings") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("lats")) {
                    latsTemp = (latsTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("lats") + 1)));
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
                if (exercise.package.exercise.musclesWorked.includes("trapezius")) {
                    trapeziusTemp = (trapeziusTemp + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("trapezius") + 1)));
                }
                if (exercise.package.exercise.musclesWorked.includes("triceps")) {
                    tricepsLevel = (tricepsLevel + (exercise.package.volume / (exercise.package.exercise.musclesWorked.indexOf("triceps") + 1)));
                }
            })

            setAbsLevel(absTemp);
            setBicepsLevel(bicepsTemp);
            setCalvesLevel(calvesTemp);
            setForearmsLevel(forearmsTemp);
            setGlutesLevel(glutesTemp);
            setHamstringsLevel(hamstringsTemp);
            setLatsLevel(latsTemp);
            setObliquesLevel(obliquesTemp);
            setPectoralsLevel(pectoralsTemp);
            setQuadricepsLevel(quadricepsTemp);
            setShouldersLevel(shouldersTemp);
            setTrapeziusLevel(trapeziusTemp);
            setTricepsLevel(tricepsLevel);
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
            {calvesLevel > 0 && <img src={calves} alt="" className="layer" style={{ opacity: `${calvesLevel * 10}%` }} />}
            {forearmsLevel > 0 && <img src={forearms} alt="" className="layer" style={{ opacity: `${forearmsLevel * 10}%` }} />}
            {glutesLevel > 0 && <img src={glutes} alt="" className="layer" style={{ opacity: `${glutesLevel * 10}%` }} />}
            {hamstringsLevel > 0 && <img src={hamstrings} alt="" className="layer" style={{ opacity: `${hamstringsLevel * 10}%` }} />}
            {latsLevel > 0 && <img src={lats} alt="" className="layer" style={{ opacity: `${latsLevel * 10}%` }} />}
            {obliquesLevel > 0 && <img src={obliques} alt="" className="layer" style={{ opacity: `${obliquesLevel * 10}%` }} />}
            {pectoralsLevel > 0 && <img src={pectorals} alt="" className="layer" style={{ opacity: `${pectoralsLevel * 10}%` }} />}
            {quadricepsLevel > 0 && <img src={quadriceps} alt="" className="layer" style={{ opacity: `${quadricepsLevel * 10}%` }} />}
            {shouldersLevel > 0 && <img src={shoulders} alt="" className="layer" style={{ opacity: `${shouldersLevel * 10}%` }} />}
            {trapeziusLevel > 0 && <img src={trapezius} alt="" className="layer" style={{ opacity: `${trapeziusLevel * 10}%` }} />}
            {tricepsLevel > 0 && <img src={triceps} alt="" className="layer" style={{ opacity: `${tricepsLevel * 10}%` }} />}

            {highlighted && toggle &&
                <div>
                    {highlighted.includes("abs") ? <img src={abs} alt="" className={getHighlightPriority(highlighted, "abs")} /> : null}
                    {highlighted.includes("biceps") ? <img src={biceps} alt="" className={getHighlightPriority(highlighted, "biceps")} /> : null}
                    {highlighted.includes("calves") ? <img src={calves} alt="" className={getHighlightPriority(highlighted, "calves")} /> : null}
                    {highlighted.includes("forearms") ? <img src={forearms} alt="" className={getHighlightPriority(highlighted, "forearms")} /> : null}
                    {highlighted.includes("glutes") ? <img src={glutes} alt="" className={getHighlightPriority(highlighted, "glutes")} /> : null}
                    {highlighted.includes("hamstrings") ? <img src={hamstrings} alt="" className={getHighlightPriority(highlighted, "hamstrings")} /> : null}
                    {highlighted.includes("lats") ? <img src={lats} alt="" className={getHighlightPriority(highlighted, "lats")} /> : null}
                    {highlighted.includes("obliques") ? <img src={obliques} alt="" className={getHighlightPriority(highlighted, "obliques")} /> : null}
                    {highlighted.includes("chest") ? <img src={pectorals} alt="" className={getHighlightPriority(highlighted, "chest")} /> : null}
                    {highlighted.includes("quadriceps") ? <img src={quadriceps} alt="" className={getHighlightPriority(highlighted, "quadriceps")} /> : null}
                    {highlighted.includes("shoulders") ? <img src={shoulders} alt="" className={getHighlightPriority(highlighted, "shoulders")} /> : null}
                    {highlighted.includes("trapezius") ? <img src={trapezius} alt="" className={getHighlightPriority(highlighted, "trapezius")} /> : null}
                    {highlighted.includes("triceps") ? <img src={triceps} alt="" className={getHighlightPriority(highlighted, "triceps")} /> : null}
                </div>
            }
        </div>
    )
}