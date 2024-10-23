package dev.phumeleletom.scheduler.service;

import dev.phumeleletom.scheduler.domain.Task;
import dev.phumeleletom.scheduler.repo.TaskRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepo taskRepo;

    public List<Task> getAllTasks(){
        return taskRepo.findAll();
    }

    public Task getTask(String id){
        return taskRepo.findById(id).orElseThrow(() ->
                new RuntimeException("Task not found."));
    }

    public Task createTask(Task task){
        return taskRepo.save(task);
    }

    public void deleteTask(String id){
        taskRepo.deleteById(id);
    }
}
