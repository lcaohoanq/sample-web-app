package com.lcaohoanq.samplewebapplication.repositories;

import com.lcaohoanq.samplewebapplication.models.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameAndPassword(String username, String password);
}
