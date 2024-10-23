import React from 'react'
import { deleteTask, saveTask, getTask,  getTasks } from '../api/TaskService';
import { TaskInterface } from '../interface/TaskInterface';
import { Task } from '../components/Task';
import TaskList from '../components/TaskList';

export const Work = ({data, deleteTask} : {data:any, deleteTask: Function}) => {
    const work: boolean = true;
    const completed: boolean = false;

    return (
        <div>
            <TaskList work={work} completed={completed} data={data} deleteTask={deleteTask} />
        </div>
    );
}