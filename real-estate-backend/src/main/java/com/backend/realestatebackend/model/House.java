package com.backend.realestatebackend.model;

import jakarta.persistence.*;
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

    @NotNull
    @Embedded
    private Address address;

    @NotNull
    @Column(name = "price")
    private Long price;

    @Column(name = "bedrooms")
    private Integer numberOfBedrooms;
}
