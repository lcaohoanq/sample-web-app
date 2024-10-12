package com.lcaohoanq.samplewebapplication.controllers;

import com.lcaohoanq.samplewebapplication.dtos.CameraDTO;
import com.lcaohoanq.samplewebapplication.models.Camera;
import com.lcaohoanq.samplewebapplication.services.ICameraService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.Nonnull;
import java.util.List;
import lombok.RequiredArgsConstructor;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class CameraEndpoint {
    private final ICameraService cameraService;

    public List<Camera> findAll() {
        return cameraService.findAll();
    }

    public Camera save(@Nonnull Camera camera) {
        return cameraService.save(camera);
    }

    public void delete(@Nonnull Long id) {
        cameraService.delete(id);
    }

    public Camera findById(@Nonnull Long id) {
        return cameraService.findById(id);
    }

    public Camera update(@Nonnull Long id, @Nonnull CameraDTO cameraDTO) {
        return cameraService.update(id, cameraDTO);
    }

}
