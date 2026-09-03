import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AddTask from "./pages/AddTask"
import EditTask from "./pages/EditTask"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add-task' element={<AddTask/>}/>
      <Route path='/edit-task/:id' element={<EditTask/>}/>

    </Routes>
  )
}

export default App