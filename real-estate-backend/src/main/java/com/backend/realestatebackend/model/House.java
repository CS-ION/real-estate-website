package com.backend.realestatebackend.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class House {

    public House(Address address,Long price,Integer numberOfBedrooms){
        this.address = address;
        this.price = price;
        this.numberOfBedrooms = numberOfBedrooms;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long houseId;
    @Embedded
    @NotNull
    @Valid
    private Address address;
    @NotNull
    @Column(name = "price")
    @Min(value = 0, message = "Price cannot be negative")
    private Long price;

    @Column(name = "bedrooms")
    @NotNull
    @Min(value = 0, message = "Number of bedrooms cannot be negative")
    private Integer numberOfBedrooms;

}
