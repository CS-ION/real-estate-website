package com.backend.realestatebackend.auth;

import com.backend.realestatebackend.configuration.JwtService;
import com.backend.realestatebackend.enums.AccountRole;
import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.User;
import com.backend.realestatebackend.repository.BrokerRepository;
import com.backend.realestatebackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;

    private final BrokerRepository brokerRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationReponse authenticateAdminCredentials(String username, String password) {
        String adminUsername = "admin";
        String adminPassword = "adminpassword";

        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            var user = User.builder()
                    .email(username)
                    .password(password)
                    .role(AccountRole.USER)
                    .build();
            var adminToken = jwtService.generateToken(0L, "ADMIN", user);
            return AuthenticationReponse.builder().token(adminToken).build();
        } else {
            throw new BadCredentialsException("Invalid admin credentials");
        }
    }



    public AuthenticationReponse registerUser(RegisterRequestUser registerRequest){
        var user = User.builder()
                .first_name(registerRequest.getFirst_name())
                .last_name(registerRequest.getLast_name())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .favoredHouses(new HashSet<>())
                .viewingRequests(new HashSet<>())
                .role(AccountRole.USER)
                .build();
        User user2 = repository.save(user);
        var jwtToken = jwtService.generateToken(user2.getId(),user2.getRole().toString(),user);
        return AuthenticationReponse.builder().token(jwtToken).build();
    }

    public AuthenticationReponse registerBroker(RegisterRequestBroker registerRequest){
        var broker = Broker.builder()
                .firstName(registerRequest.getFirst_name())
                .lastName(registerRequest.getLast_name())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .broker_description(registerRequest.getBroker_description())
                .phoneNumber(registerRequest.getPhoneNumber())
                .location(registerRequest.getLocation())
                .houses(new HashSet<>())
                .viewingRequests(new HashSet<>())
                .role(AccountRole.BROKER)
                .build();
        Broker broker2 = brokerRepository.save(broker);
        var jwtToken = jwtService.generateToken(broker2.getBrokerId(),broker2.getRole().toString(),broker);
        return AuthenticationReponse.builder().token(jwtToken).build();
    }

    public AuthenticationReponse authenticateUser(AuthenticationRequest authenticationRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getEmail(),
                authenticationRequest.getPassword()
        ));
        var user = repository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user.getId(),user.getRole().toString(),user);
        return AuthenticationReponse.builder().token(jwtToken).build();
    }
    public AuthenticationReponse authenticateBroker(AuthenticationRequest authenticationRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getEmail(),
                authenticationRequest.getPassword()
        ));
        System.out.println(authenticationRequest.getEmail());
        var broker = brokerRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(broker.getBrokerId(),broker.getRole().toString(),broker);
        return AuthenticationReponse.builder().token(jwtToken).build();
    }
}
