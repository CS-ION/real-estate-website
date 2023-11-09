package com.backend.realestatebackend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    @PostMapping("/register-user")
    public ResponseEntity<AuthenticationReponse> registerUser(
            @RequestBody RegisterRequestUser request
    ){
        return ResponseEntity.ok(authenticationService.registerUser(request));
    }

    @PostMapping("/authenticate-user")
    public ResponseEntity<AuthenticationReponse> authenticateUser(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationService.authenticateUser(request));
    }

    @PostMapping("/register-broker")
    public ResponseEntity<AuthenticationReponse> registerBroker(
            @RequestBody RegisterRequestBroker request
    ){
        return ResponseEntity.ok(authenticationService.registerBroker(request));
    }

    @PostMapping("/authenticate-broker")
    public ResponseEntity<AuthenticationReponse> authenticateBroker(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationService.authenticateBroker(request));
    }


}
