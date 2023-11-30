package com.backend.realestatebackend.model;

import com.backend.realestatebackend.enums.AccountRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Broker implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broker_id")
    private Long brokerId;


    @Size(min = 2, max = 50)
    @Column(name = "first_name")
    private String firstName;


    @Size(min = 2, max = 50)
    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Email(message = "Email already exists.")
    @Column(unique=true ,name = "email")
    private String email;

    @Column(name = "description")
    private String broker_description;


    @Embedded
    @Valid
    private Location location;

    @OneToMany(mappedBy = "broker",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<House> houses = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "broker_viewing_requests",
            joinColumns = @JoinColumn(name = "broker_id"),
            inverseJoinColumns = @JoinColumn(name = "viewing_request_id")
    )
    private Set<ViewingRequest> viewingRequests = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "broker_buy_offers",
            joinColumns = @JoinColumn(name = "broker_id"),
            inverseJoinColumns = @JoinColumn(name = "buy_offer_id")
    )
    private Set<BuyOffer> buyOffers = new HashSet<>();

    @Column(name = "role")
    @JsonIgnore
    private AccountRole role = AccountRole.BROKER;

    private String password;

    @Override
    public int hashCode() {
        return Objects.hash(brokerId);
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Broker otherBroker = (Broker) obj;
        return this.brokerId.equals(otherBroker.brokerId);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
