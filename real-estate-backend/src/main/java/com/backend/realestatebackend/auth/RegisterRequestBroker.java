package com.backend.realestatebackend.auth;

import com.backend.realestatebackend.model.Location;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestBroker {
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    @Pattern(regexp = "^(\\+\\d{1,3}[-.\\s]?)?\\(\\d{1,4}\\)[-.\s]?\\d{1,4}[-.\\s]?\\d{1,9}$")
    private String phoneNumber;
    private String broker_description;
    private Location location;
}
