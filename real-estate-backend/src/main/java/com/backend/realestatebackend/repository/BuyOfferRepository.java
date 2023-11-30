package com.backend.realestatebackend.repository;

import org.springframework.stereotype.Repository;
import com.backend.realestatebackend.model.BuyOffer;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface BuyOfferRepository extends JpaRepository<BuyOffer, Long> {
    
}
