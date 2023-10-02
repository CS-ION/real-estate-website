package com.backend.realestatebackend.controller;

import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.service.HouseService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/house")
@RequiredArgsConstructor
public class HouseController {

    private final HouseService houseService;

    @GetMapping("/houses")
    public List<House> getAllHouses() {
        return houseService.getAllHouses();
    }

    @GetMapping("/houses/{id}")
    public House getHouse(@PathVariable Long id) {
        return houseService.getHouse(id);
    }

    @GetMapping("/houses/price-filter")
    public List<House> getHouseByPriceRange(@RequestParam(name = "minPrice", required = true) Long minPrice,
                                            @RequestParam(name = "maxPrice", required = true) Long maxPrice) {
        return houseService.findByPriceBetween(minPrice,maxPrice);
    }

    @GetMapping("/houses/filter")
    public List<House> getHousesByFilters(
            @RequestParam(name = "minPrice", required = false) Long minPrice,
            @RequestParam(name = "maxPrice", required = false) Long maxPrice,
            @RequestParam(name = "street", required = false) String street,
            @RequestParam(name = "city", required = false) String city,
            @RequestParam(name = "province", required = false) String province,
            @RequestParam(name = "bedrooms", required = false) Integer bedrooms,
            @RequestParam(name = "streetNumber", required = false) Integer streetNumber
    ){
        return houseService.filterHouses(minPrice, maxPrice, street, city, province, bedrooms, streetNumber);
    }

}
