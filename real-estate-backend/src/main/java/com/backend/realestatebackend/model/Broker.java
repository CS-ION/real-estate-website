package com.backend.realestatebackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Broker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broker_id")
    private Long brokerId;

    @NotBlank
    @Size(min = 2, max = 50)
    @Column(name = "first_name")
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 50)
    @Column(name = "last_name")
    private String lastName;

    @Pattern(regexp = "^(\\+\\d{1,3}[-.\\s]?)?\\(\\d{1,4}\\)[-.\s]?\\d{1,4}[-.\\s]?\\d{1,9}$")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Email(message = "Email already exists.")
    @Column(unique=true ,name = "email")
    private String email;

    @Embedded
    @NotNull
    @Valid
    private Location location;

    @OneToMany(mappedBy = "broker",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<House> houses = new HashSet<>();

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Broker otherBroker = (Broker) obj;
        return this.brokerId.equals(otherBroker.brokerId);
    }
}
