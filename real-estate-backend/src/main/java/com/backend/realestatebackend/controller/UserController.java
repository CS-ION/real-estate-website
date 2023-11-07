package com.backend.realestatebackend.controller;


import com.backend.realestatebackend.model.User;
import com.backend.realestatebackend.model.ViewingRequest;
import com.backend.realestatebackend.repository.ViewingRequestRepository;
import com.backend.realestatebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ViewingRequestRepository viewingRequestRepository;

    @GetMapping("/all-users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @GetMapping("/viewing-requests/{id}")
    public Set<ViewingRequest> getViewingRequests(@PathVariable Long id){return userService.getViewingRequests(id);}

    @PostMapping("/favourite-house/{user_id}/{house_id}")
    public void favouriteHouse(@PathVariable Long user_id,@PathVariable Long house_id){
        userService.favouriteHouse(user_id,house_id);
    }

    @DeleteMapping("/favourite-house/{user_id}/{house_id}")
    public void removeFavouriteHouse(@PathVariable Long user_id,@PathVariable Long house_id){
        userService.removeFavouriteHouse(user_id,house_id);
    }

    @PostMapping("/request-viewing/{user_id}/{house_id}")
    public void requestViewing(@PathVariable Long user_id,
                               @PathVariable Long house_id,
                               @RequestParam String availabilityDescription,
                               @RequestBody List<String> availability){
        userService.requestViewing(user_id,house_id,availabilityDescription,availability);
    }

    @DeleteMapping("/request-viewing/{user_id}/{request_id}")
    public void deleteRequest(@PathVariable Long user_id, @PathVariable Long request_id){
        userService.deleteUserViewingRequest(user_id,request_id);
    }

    @GetMapping("/all-requests")
    public List<ViewingRequest> getAllRequests(){
        return viewingRequestRepository.findAll();
    }

}
