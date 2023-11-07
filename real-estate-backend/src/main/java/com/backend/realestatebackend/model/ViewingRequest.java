package com.backend.realestatebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Data
@NoArgsConstructor
@Entity
public class ViewingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long viewingRequestId;

    public ViewingRequest(String userFirstName,String userLastName,
                          String userEmail,Long houseId,
                          Long userId,Long brokerId,
                          String availabilityDescription,
                          List<String> availability){
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.houseId = houseId;
        this.userId = userId;
        this.brokerId = brokerId;
        this.availabilityDescription = availabilityDescription;
        this.availability = availability;
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
    private String availabilityDescription;

    private List<String> availability = new ArrayList<>();


}
