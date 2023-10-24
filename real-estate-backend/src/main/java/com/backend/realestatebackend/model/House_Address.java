package com.backend.realestatebackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class House_Address {
    @NotBlank(message = "City cannot be blank.")
    private String city;

    @NotBlank(message = "Province cannot be blank.")
    private String province;

    @Min(value = 1, message = "Street number must be a positive integer.")
    private Integer streetNumber;

    @NotBlank(message = "Street name cannot be blank.")
    private String street;

    @Pattern(regexp = "^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$", message = "Postal code must follow the format A1A 1A1.")
    @NotBlank(message = "Postal code cannot be blank.")
    private String postalCode;
}


