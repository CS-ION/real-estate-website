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

    public House(House_Address address, HouseStatus status, HouseType type, Long price, Integer numberOfBedrooms,
                 Integer numberOfBathrooms, Broker broker, String unit,Double area) {
        this.address = address;
        this.status = status;
        this.type = type;
        this.area = area;
        this.price = price;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.broker = broker;
        this.unit = unit;

        // Check if this is what's needed for the unit field
        if (type != HouseType.HOUSE) {
            this.unit = "Default Unit";
        }
    }


    public enum HouseStatus {
        FOR_SALE, FOR_LEASE
    }

    public enum HouseType {
        CONDO, APARTMENT, HOUSE
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long houseId;
    @Embedded
    @NotNull
    @Valid
    private House_Address address;

    @Column(name = "area")
    private Double area;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @NotNull(message = "Status cannot be null")
    private HouseStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    @NotNull(message = "Type cannot be null")
    private HouseType type;
    @NotNull
    @Column(name = "price")
    @Min(value = 0, message = "Price cannot be negative")
    private Long price;

    @Column(name = "bedrooms")
    @NotNull
    @Min(value = 0, message = "Number of bedrooms cannot be negative")
    private Integer numberOfBedrooms;

    @Column(name = "bathrooms")
    @NotNull
    @Min(value = 0, message = "Number of bathrooms cannot be negative")
    private Integer numberOfBathrooms;

    @ManyToOne
    @JoinColumn(name = "broker_id")
    @NotNull(message="House must have a broker")
    private Broker broker;

    @Column(name = "unit")
    private String unit;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        House otherHouse = (House) obj;
        return this.houseId.equals(otherHouse.houseId);
    }

}
