import axios from "axios";
import { TaskInterface } from "../interface/TaskInterface";

const API_URL = "http://localhost:8080";

export async function saveTask(task : TaskInterface) {
    return await axios.post(API_URL, task);
  }
  
  export async function getTasks() {
    return await axios.get(API_URL);
  }
  
  export async function getTask(id: string) {
    return await axios.get(`${API_URL}/${id}`);
  }

  export async function getCompletedTasks(id: string) {
    return await axios.get(`${API_URL}/completed`);
  }

  export async function getWorkTasks(id: string) {
    return await axios.get(`${API_URL}/work`);
  }
  
  export async function deleteTask(id: string) {
    return await axios.delete(`${API_URL}/${id}`);
  }