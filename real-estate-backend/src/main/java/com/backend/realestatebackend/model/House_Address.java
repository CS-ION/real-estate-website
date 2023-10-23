package com.backend.realestatebackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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
public class House_Address extends Location{

    public House_Address(Integer streetNumber, String street, String city, String province, String postalCode) {
        super(city,province);
        this.streetNumber = streetNumber;
        this.street = street;
        this.postalCode = postalCode;
    }

    @Min(value = 1, message = "Street number must be a positive integer.")
    @Column(name = "street_number")
    private Integer streetNumber;

    @NotBlank(message = "Street name cannot be blank.")
    @Column(name = "street")
    private String street;

    @Pattern(regexp = "^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$", message = "Postal code must follow the format A1A 1A1.")
    @NotBlank(message = "Postal code cannot be blank.")
    @Column(name = "postal_code")
    private String postalCode;
}

