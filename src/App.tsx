import { Exercise } from "./features/exercise/Exercise"
import "./App.css"
import BodyFrame from "./features/bodyFrame/BodyFrame"
import { StorageMenu } from "./features/storageMenu/StorageMenu"
import { v4 as uuidv4 } from 'uuid';
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

    if (sharedList) {
      for (let i = 0; i < sharedList.length; i++) {
        const [e, v] = sharedList[i].split("v");
          dispatch(add({
            exercise: {...exerciseId[e]},
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
