import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import { Exercise } from "./features/exercise/Exercise"
import "./App.css"
import BodyFrame from "./features/bodyFrame/BodyFrame"

import { useEffect } from "react"

function App() {

  function initLocalStorage() {
    localStorage.setItem("test",
      JSON.stringify([
        {
          id: "123",
          package: {
            exercise: {
              title: "Deadlift",
              musclesWorked: ["trapezius, glutes, abs"]
            },
            volume: 2
          }
        },
        {
          id: "124",
          package: {
            exercise: {
              title: "Barbell Squat",
              musclesWorked: ["glutes", "hamstrings", "lats"]
            },
            volume: 3
          }
        },
      ]))
  }

  useEffect(() => {
    initLocalStorage()
  })

  return (
    <div className="app">
      <h1 className="page-title">WORKOUT VISUALISER</h1>
      <Exercise />
      <BodyFrame />
    </div>
  )
}

export default App
