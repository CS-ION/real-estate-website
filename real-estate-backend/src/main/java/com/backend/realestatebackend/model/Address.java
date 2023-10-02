package com.backend.realestatebackend.model;

import jakarta.persistence.*;
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
public class Address {

    @Min(value = 1, message = "Street number must be a positive integer.")
    @Column(name = "street_number")
    private Integer streetNumber;

    @NotBlank(message = "Street name cannot be blank.")
    @Column(name = "street")
    private String street;

    @NotBlank(message = "City cannot be blank.")
    @Column(name = "city")
    private String city;

    @NotBlank(message = "Province cannot be blank.")
    @Column(name = "province")
    private String province;

    @Pattern(regexp = "^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$", message = "Postal code must follow the format A1A 1A1.")
    @NotBlank(message = "Postal code cannot be blank.")
    @Column(name = "postal_code")
    private String postalCode;
}
