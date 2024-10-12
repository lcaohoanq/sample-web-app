package com.lcaohoanq.samplewebapplication.controllers;

import com.lcaohoanq.samplewebapplication.models.User;
import com.lcaohoanq.samplewebapplication.services.IUserService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class LoginEndpoint {

    private final IUserService userService;

    public User login(String username, String password) {
        return userService.login(username, password);
    }

}
