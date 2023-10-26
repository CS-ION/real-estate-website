package com.backend.realestatebackend.controller;


import com.backend.realestatebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

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
                               Long house_id,
                               @RequestParam String availabilityDescription,
                               @RequestBody List<String> availability){
        userService.requestViewing(user_id,house_id,availabilityDescription,availability);
    }

}
