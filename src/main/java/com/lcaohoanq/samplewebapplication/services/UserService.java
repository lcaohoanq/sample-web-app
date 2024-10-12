package com.lcaohoanq.samplewebapplication.services;

import com.lcaohoanq.samplewebapplication.dtos.UserDTO;
import com.lcaohoanq.samplewebapplication.models.User;
import com.lcaohoanq.samplewebapplication.repositories.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService{

    private final UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password).orElseThrow(() -> new NullPointerException("User not found"));
    }

    @Override
    public User register(UserDTO userDTO) {
        if(userRepository.findByUsernameAndPassword(userDTO.username(), userDTO.password()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        return userRepository.save(User.builder()
                .email(userDTO.email())
                .username(userDTO.username())
                .password(userDTO.password())
                .role(userDTO.role())
                .status(userDTO.status())
                .build());
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User update(Long id, UserDTO userDTO) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setEmail(userDTO.email());
                    user.setUsername(userDTO.username());
                    user.setPassword(userDTO.password());
                    user.setRole(userDTO.role());
                    user.setStatus(userDTO.status());
                    return userRepository.save(user);
                })
                .orElse(null);
    }
}
