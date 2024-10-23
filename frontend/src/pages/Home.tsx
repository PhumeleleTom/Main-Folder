import React from 'react'
import { deleteTask, saveTask, getTask,  getTasks } from '../api/TaskService';
import { TaskInterface } from '../interface/TaskInterface';
import { Task } from '../components/Task';
import TaskList from '../components/TaskList';

export const Home = ({data, deleteTask} : {data:any, deleteTask: Function}) => {
    const work: boolean = false;
    const completed: boolean = false;

    return (
        <div>
            <TaskList work={work} completed={completed} data={data} deleteTask={deleteTask} />
        </div>
    );
}