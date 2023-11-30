package com.backend.realestatebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class Location {

    public Location(Location location){
        this.city = location.city;
        this.province = location.province;
    }

    @NotBlank(message = "City cannot be blank.")
    @Column(name = "city")
    private String city;

    @NotBlank(message = "Province cannot be blank.")
    @Column(name = "province")
    private String province;

}
