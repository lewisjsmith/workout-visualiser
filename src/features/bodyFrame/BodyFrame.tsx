import { useAppSelector } from "../../app/hooks";
import {
    ExercisePackage,
    selectExercise
} from "../exercise/exerciseSlice";

import base from "../../assets/Base.png";
import LeftShoulder from "../../assets/Left-Shoulder.png";
import LeftPectoral from "../../assets/Left-Pectoral.png";

export default function BodyFrame() {

    const exerciseList = useAppSelector(selectExercise);

    return (
        <div className="body-frame">
            <img src={base} alt="" className="base"/>
            {exerciseList.map((exercise: ExercisePackage) => {

                if(exercise.package.exercise.musclesWorked[0] === "shoulders") {
                    return (
                        <img key={exercise.id} src={LeftShoulder} alt="" className="layer"/>
                    )
                }

                if(exercise.package.exercise.musclesWorked[0] === "chest") {
                    return (
                        <img key={exercise.id} src={LeftPectoral} alt="" className="layer"/>
                    )
                }

            })}
        </div>
    )
}