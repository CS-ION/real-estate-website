package com.backend.realestatebackend.repository;

import com.backend.realestatebackend.model.ViewingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewingRequestRepository extends JpaRepository<ViewingRequest,Long> {
}
