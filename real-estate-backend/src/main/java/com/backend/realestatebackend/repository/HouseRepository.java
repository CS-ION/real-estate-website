package com.backend.realestatebackend.repository;

import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.model.House_Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

    Optional<House> findByAddress(House_Address address);

    @Query(value ="SELECT *\n" +
            "FROM House h\n" +
            "WHERE\n" +
            "    (:minPrice IS NULL OR h.price >= :minPrice)\n" +
            "    AND (:maxPrice IS NULL OR h.price <= :maxPrice)\n" +
            "    AND (:street IS NULL OR h.street = :street)\n" +
            "    AND (:city IS NULL OR h.city = :city)\n" +
            "    AND (:province IS NULL OR h.province = :province)\n" +
            "    AND (:bedrooms IS NULL OR h.bedrooms = :bedrooms)\n" +
            "    AND (:bathrooms IS NULL OR h.bathrooms = :bathrooms)\n" +
            "    AND (:streetNumber IS NULL OR h.street_number = :streetNumber)" +
            "    AND (:type IS NULL OR h.type = :type);",
            nativeQuery = true)
    List<House> findByFilters(
            @Param("minPrice") Long minPrice,
            @Param("maxPrice") Long maxPrice,
            @Param("street") String street,
            @Param("city") String city,
            @Param("province") String province,
            @Param("bedrooms") Integer bedrooms,
            @Param("bathrooms") Integer bathrooms,
            @Param("streetNumber") Integer streetNumber,
            @Param("type") House.HouseType type
    );



}
