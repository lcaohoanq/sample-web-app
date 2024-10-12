package com.lcaohoanq.samplewebapplication.controllers;

import com.lcaohoanq.samplewebapplication.dtos.UserDTO;
import com.lcaohoanq.samplewebapplication.models.User;
import com.lcaohoanq.samplewebapplication.services.IUserService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class RegisterEndpoint {

    private final IUserService userService;

    public User register(UserDTO userDTO) {
        return userService.register(userDTO);
    }

}
