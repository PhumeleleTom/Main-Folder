package dev.phumeleletom.scheduler.repo;

import dev.phumeleletom.scheduler.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepo extends JpaRepository<Task, String> {
    Optional<Task> findById(String id);
}
