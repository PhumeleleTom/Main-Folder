import { useState } from "react";
import "../App.css";
import clock_icon from '../icons/clock_icon.png';
import Popup from 'reactjs-popup';
import { deleteTask, saveTask, getTask, getTasks } from '../api/TaskService';
import { TaskInterface } from "../interface/TaskInterface";
import React from "react";
import { Form } from "./Form";


export const Task = ({ task, deleteTask } : {task: TaskInterface, deleteTask: Function}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const modalRef = React.createRef<HTMLDialogElement>();
    const toggleModal = (show:boolean) => { show ? modalRef?.current?.showModal()  : modalRef?.current?.close();};


    return (
        <div className="taskContainer">
            {task.completed ? 
            (<input  type="checkbox" checked onClick={async () =>  {
                task.completed = false;
                try{
                    await saveTask({...task,completed: false});
                    window.location.reload();
                    console.log("working");
                }
                catch(error){
                    console.log(error);
                }
            }} ></input>) 
            : <input  type="checkbox"  onClick={async () =>  {
                task.completed = true;
                try{
                    await saveTask({...task,completed: true});
                    window.location.reload();
                    console.log("completed");
                }
                catch(error){
                    console.log(error);
                }
            }} ></input>}
            <p>{task.name}</p>
            <p className="taskTime">
                <img src={clock_icon} alt="home icon" width="25" height="25"/>
                {task.startTime} - {task.endTime}
            </p>

            <Popup trigger={<button className="toggleButton"></button>} position="bottom center">
                <div className="menuPopup">
                    <ul>
                    <li className='listItem'><button className="listButton" onClick={() => toggleModal(true)}>Edit</button></li>
                    <li className='listItem' onClick={() => {deleteTask(task.id); window.location.reload();}} ><button className="listButton">Delete</button></li>
                    </ul>
                </div>
            </Popup>

            <dialog ref={modalRef}>
                <Form toggleModal={toggleModal} task={task} />
            </dialog>

        </div>
    );
}