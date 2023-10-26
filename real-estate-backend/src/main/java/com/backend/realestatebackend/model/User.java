package com.backend.realestatebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @NotBlank
    @NotNull
    @Column(name = "first_name")
    private String first_name;

    @NotBlank
    @NotNull
    @Column(name = "last_name")
    private String last_name;

    @Email(message = "Not a valid email")
    @Column(name = "user_email")
    @NotNull
    private String email;

    @ManyToMany
    @JoinTable(
            name = "user_favored_houses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "house_id")
    )
    private Set<House> favoredHouses = new HashSet<>();
}
