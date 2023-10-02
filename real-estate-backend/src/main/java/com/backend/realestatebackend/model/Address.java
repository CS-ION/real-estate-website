package com.backend.realestatebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Min(value = 1)
    @Column(name = "street_number")
    private Integer streetNumber;
    @NotBlank
    @Column(name = "street")
    private String street;

    @NotBlank
    @Column(name = "city")
    private String city;
    @NotBlank
    @Column(name = "province")
    private String province;

    @Pattern(regexp = "^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$")
    @NotBlank
    @Column(name = "postal_code")
    private String postalCode;
}
