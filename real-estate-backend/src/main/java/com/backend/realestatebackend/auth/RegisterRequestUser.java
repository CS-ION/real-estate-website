package com.backend.realestatebackend.auth;

import com.backend.realestatebackend.model.Location;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestUser {

    private String first_name;
    private String last_name;
    private String email;
    private String password;

}
