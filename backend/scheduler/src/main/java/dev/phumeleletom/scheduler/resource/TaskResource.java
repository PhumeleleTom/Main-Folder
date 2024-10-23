package dev.phumeleletom.scheduler.resource;

import dev.phumeleletom.scheduler.domain.Task;
import dev.phumeleletom.scheduler.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class TaskResource {
    private final TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable(value = "id") String id){
        taskService.deleteTask(id);

    }

    @GetMapping
    public List<Task> getTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable(value = "id") String id){
        return taskService.getTask(id);
    }

    @GetMapping("/completed")
    public List<Task> getCompletedTasks(){
        return taskService.getAllTasks().stream().map((task) -> {
            if(task.getCompleted()){
                return task;
            }
            return null;
        }).toList();
    }

    @GetMapping("/work")
    public List<Task> getWorkTasks(){
        return taskService.getAllTasks().stream().map((task) -> {
            if(!task.getCompleted()){
                return task;
            }
            return null;
        }).toList();
    }
}
