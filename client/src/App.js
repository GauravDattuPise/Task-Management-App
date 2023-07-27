

import {Routes, Route  } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Header from './components/Header/Header';
import Register from './components/page/Register';
import Login from './components/page/Login';
import CreateTask from "./components/page/createTask";
import MyTask from "./components/page/MyTask";
import EditTask from "./components/page/EditTask";

function App() {
  return (
    <>
    <Toaster/>
      <Header/>
      <Routes>        
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/create-task' element={<CreateTask />}/>
        <Route path="/my-task" element={<MyTask/>}/>
        <Route path="/tasks-edit/:id" element={<EditTask/>}/>
      </Routes>
    </>
  );
}

export default App;
