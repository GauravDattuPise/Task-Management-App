

import {Routes, Route  } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Header from './components/Header/Header';
import Register from './components/page/Register';
import Login from './components/page/Login';
import CreateTask from "./components/page/createTask";

function App() {
  return (
    <>
    <Toaster/>
      <Header/>
      <Routes>        
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-task' element={<CreateTask />}/>
      </Routes>
    </>
  );
}

export default App;
