package com.lcaohoanq.samplewebapplication.controllers;

import com.lcaohoanq.samplewebapplication.models.User;
import com.lcaohoanq.samplewebapplication.services.IUserService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
@RequestMapping("/api/v1/login")
public class LoginEndpoint {

    private final IUserService userService;

    public User login(String username, String password) {
        return userService.login(username, password);
    }

}
