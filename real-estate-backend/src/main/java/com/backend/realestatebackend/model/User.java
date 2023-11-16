package com.backend.realestatebackend.model;

import com.backend.realestatebackend.enums.AccountRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;


    @Column(name = "first_name")
    private String first_name;


    @Column(name = "last_name")
    private String last_name;

    @Email(message = "Not a valid email")
    @Column(name = "user_email")
    private String email;

    private String password;



    @ManyToMany
    @JoinTable(
            name = "user_favored_houses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "house_id")
    )
    private Set<House> favoredHouses = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_viewing_requests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "viewing_request_id")
    )
    private Set<ViewingRequest> viewingRequests = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_buy_offers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "buy_offer_id")
    )
    private Set<BuyOffer> buyOffers = new HashSet<>();

    @Column(name = "role")
    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private AccountRole role = AccountRole.USER;

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
