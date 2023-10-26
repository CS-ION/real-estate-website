package com.backend.realestatebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;





@Data
@NoArgsConstructor
public class ViewingRequest {

    public ViewingRequest(String userFirstName,String userLastName,
                          String userEmail,Long houseId,String availabilityDescription,
                          List<String> availability){
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.houseId = houseId;
        this.availabilityDescription = availabilityDescription;
        this.availability = availability;
    }


    @NotBlank
    private String userFirstName;

    @NotBlank
    private String userLastName;

    @Email(message = "Not a valid email")
    private String userEmail;


    // maybe instead of the house id the house description will be on the request instead
    private Long houseId;
    private String availabilityDescription;

    private List<String> availability;


}
