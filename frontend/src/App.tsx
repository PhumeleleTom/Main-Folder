import React, { createRef, useEffect } from 'react';
import { useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './pages/Home';
import { Completed } from './pages/Completed';
import { Work } from './pages/Work';
import { Navbar } from './components/Navbar';
import { Task } from './components/Task';
import { Form } from './components/Form';
import Popup from 'reactjs-popup';
import { deleteTask, saveTask, getTask,  getTasks } from './api/TaskService';
import { TaskInterface } from './interface/TaskInterface';

function App() {
  const [data, setData] = useState({});
  const initialTask: TaskInterface = {
    id: "",
    name: "",
    startTime: "",
    endTime: "",
    completed: false,
    notes: ""
  };
  
  const [task, setTask] = useState(initialTask);

  const getAllTasks = async () => {
    try{
      const { data } = await getTasks();
      setData(data);
      console.log(data);
    }
    catch(error){
      console.log(error);
    }
  }

  const deleteTask = async (id: string) => {
    try{
      await deleteTask(id);
      window.location.reload();
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  const modalRef = React.createRef<HTMLDialogElement>();
  const toggleModal = (show:boolean) => { show ? modalRef?.current?.showModal()  : modalRef?.current?.close();};

  return (
    <div className="App">
      <Router>

        <div className='navbar'>
          <Navbar />
        </div>

        <div className='main'>
        <Routes>
            <Route path="/" element={ <Home data={data} deleteTask={deleteTask}  /> } />
            <Route path="/Completed" element={ <Completed data={data} deleteTask={deleteTask}  /> } />
            <Route path="/Work" element={<Work data={data} deleteTask={deleteTask}/>} />
            <Route path="*" element={<h1>ERROR: 404 Page Not Found!</h1>} />
          </Routes>

          <button onClick={() => toggleModal(true)} className='newTaskButton' name='newTaskButton'> + Create Task </button>
          <dialog ref={modalRef}>
            <Form toggleModal={toggleModal} task={initialTask} />
          </dialog>



        </div>
      </Router>

      

      
    </div>
  );
}

export default App;
