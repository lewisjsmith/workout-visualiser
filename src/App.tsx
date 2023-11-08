import { Exercise } from "./features/exercise/Exercise";
import "./App.css";
import "./fonts/font.css";
import "./fonts/Montserrat-Regular.ttf";
import BodyFrame from "./features/bodyFrame/BodyFrame";
import { StorageMenu } from "./features/storageMenu/StorageMenu";
import { add } from "./features/exercise/exerciseSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { exerciseId } from "./features/exercise/lookup";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sharedExercise = urlParams.get("plan");
    const sharedList = sharedExercise?.split(/(?<=v[1-3])/);
    let count = 0;

    for (let e in exerciseId) {
      count += 1;
    }

    if (sharedList) {
      for (let i = 0; i < sharedList.length; i++) {
        const [e, v] = sharedList[i].split("v");
        if (e && Number(e) <= count && Number(e) >= 1 && v && Number(v) <= 3 && Number(v) >= 1)
          dispatch(add({
            exercise: { ...exerciseId[e] },
            volume: Number(v)
          }))
      }
    }

  }, [])

  return (
    <div className="app">
      <h1 className="page-title">WORKOUT VISUALISER</h1>
      <Exercise />
      <BodyFrame />
      <StorageMenu />
    </div>
  )
}

export default App
