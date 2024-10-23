import "../App.css";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { set, useForm } from "react-hook-form";
import { TaskInterface } from "../interface/TaskInterface";
import { saveTask } from "../api/TaskService";

export const Form = ({ toggleModal, task } : { toggleModal : Function, task: TaskInterface}) => {
    const [taskName, setTaskName] = useState("");
    const [taskStartTime, setTaskStartTime] = useState("")
    const [taskEndTime, setTaskEndTime] = useState("")
    const [taskNotes, setTaskNotes] = useState("")

    useEffect(() => {
        if(task.id !== ""){
            setTaskName(task.name);
            setTaskStartTime(task.startTime);
            setTaskEndTime(task.endTime);
            setTaskNotes(task.notes);
        }
    }, []);

    

    const schema = yup.object().shape({
        name: yup.string().required("Task Name Required"),
        startTime: yup.string().required("Start Time is Required."),
        endTime: yup.string().required("End Time is Required."),
        notes: yup.string()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const createTask = async (event: any) => {
        const newTask: TaskInterface = {
            id: '',
            name: event.name,
            startTime: event.startTime,
            endTime: event.endTime,
            notes: event.notes,
            completed: false,
        }
        try{
            if(task.id !== "")
            {
                console.log(task);
                saveTask({
                    ...task,
                    name: event.name,
                    startTime: event.startTime,
                    endTime: event.endTime,
                    notes: event.notes
                })
            }else{
                const { data } = await saveTask(newTask);
                newTask.id = data.id;
            }
            setTaskName("");
            setTaskStartTime("");
            setTaskEndTime("");
            setTaskNotes("");

            toggleModal(false);
            window.location.reload();
        }
        catch(error){
            console.log(error);
        }
        
    }


    return (
        <div>
            <form className="newTaskForm" onSubmit={handleSubmit(createTask)}>
                <input type="text" placeholder="Name of the task" {...register("name")} onChange={(event) => {
                    setTaskName(event.target.value);
                }} value={taskName}></input>
                <p className="errorMessage">{errors.name?.message}</p>
                <input type="time" placeholder="Start Time" {...register("startTime")} onChange={(event) => {
                    setTaskStartTime(event.target.value);
                }} value={taskStartTime}></input>
                <p className="errorMessage">{errors.startTime?.message}</p>
                <input type="time" placeholder="End Time" {...register("endTime")} onChange={(event) => {
                    setTaskEndTime(event.target.value);
                }} value={taskEndTime}></input>
                <p className="errorMessage">{errors.endTime?.message}</p>
                <textarea placeholder="Task Notes" {...register("notes")} rows={10} cols={10} onChange={(event) => {
                    setTaskNotes(event.target.value);
                }} value={taskNotes}></textarea>
                <button className="cancelButton" onClick={() => {toggleModal(false);}}> Cancel </button>
                <input className="addTaskButton" type="submit" value={"Save Task"}></input>
            </form>
        </div>
    );
}