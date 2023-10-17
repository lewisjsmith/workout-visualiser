import logo from "./logo.svg"
import { Exercise } from "./features/exercise/Exercise"
import "./App.css"
import BodyFrame from "./features/bodyFrame/BodyFrame"
import { StorageMenu } from "./features/storageMenu/StorageMenu"

function App() {

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
