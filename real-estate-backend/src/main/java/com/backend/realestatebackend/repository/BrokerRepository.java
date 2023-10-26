package com.backend.realestatebackend.repository;

import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrokerRepository extends JpaRepository<Broker, Long> {

    public Optional<Broker> findByEmail(String email);
}
