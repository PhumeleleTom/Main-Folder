import React from 'react'
import { deleteTask, saveTask, getTask,  getTasks } from '../api/TaskService';
import { TaskInterface } from '../interface/TaskInterface';
import { Task } from './Task';

interface Props{
  work: boolean;
  completed: boolean;
  data: any;
  deleteTask: Function;
}

const TaskList = (props: Props) => {

  if(props.work){
    return (
      <>
        {props.data?.length > 0 && props.data.map((currentTask: TaskInterface, key:any) => {
          if(!currentTask.completed){
            return <Task task={currentTask} key={key} deleteTask={deleteTask}/>
          }
        })};
      </>
    )
  }
  if(props.completed){
    return (
      <>
        {props.data?.length > 0 && props.data.map((currentTask: TaskInterface, key:any) => {
          if(currentTask.completed){
            return <Task task={currentTask} key={key} deleteTask={deleteTask} />
          }
        })}
      </>
    )
  }
    return (
    <>
      {props.data?.length > 0 && props.data.map((currentTask: TaskInterface, key:any) => {
        return(
          <Task task={currentTask} key={key} deleteTask={deleteTask} />
        ); 
      })}
    </>
  )}

export default TaskList
