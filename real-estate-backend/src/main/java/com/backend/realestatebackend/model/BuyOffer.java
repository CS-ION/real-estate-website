package com.backend.realestatebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@Entity
public class BuyOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buy_offer_id;

    public BuyOffer(String userFirstName,String userLastName,
                          String userEmail,Long houseId,
                          Long userId,Long brokerId,
                          String offerDescription,
                          Long offer_price){
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.houseId = houseId;
        this.userId = userId;
        this.brokerId = brokerId;
        this.offer_price = offer_price;
        this.offerDescription = offerDescription;
    }

    @NotBlank
    private String userFirstName;

    @NotBlank
    private String userLastName;

    @Email(message = "Not a valid email")
    private String userEmail;
    @NotNull
    private Long userId;
    @NotNull
    private Long brokerId;
    @NotNull
    private Long houseId;
    private Long offer_price;
    private String offerDescription;

}
