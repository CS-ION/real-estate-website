package com.backend.realestatebackend.repository;

import com.backend.realestatebackend.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

    List<House> findByPriceBetween(Long minPrice, Long maxPrice);

    List<House> findByAddressStreet(String street);

    @Query(value = "SELECT * FROM House h " +
            "WHERE (:minPrice IS NULL OR h.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR h.price <= :maxPrice) " +
            "AND (:street IS NULL OR h.address.street = :street) " +
            "AND (:city IS NULL OR h.address.city = :city) " +
            "AND (:province IS NULL OR h.address.province = :province) " +
            "AND (:bedrooms IS NULL OR h.numberOfBedrooms = :bedrooms) " +
            "AND (:streetNumber IS NULL OR h.address.streetNumber = :streetNumber)",
            nativeQuery = true)
    List<House> findByFilters(
            @Param("minPrice") Long minPrice,
            @Param("maxPrice") Long maxPrice,
            @Param("street") String street,
            @Param("city") String city,
            @Param("province") String province,
            @Param("bedrooms") Integer bedrooms,
            @Param("streetNumber") Integer streetNumber
    );







}
