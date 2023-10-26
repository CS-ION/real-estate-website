package com.backend.realestatebackend.controller;

import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.service.HouseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/houses")
@RequiredArgsConstructor
public class HouseController {

    private final HouseService houseService;

    @GetMapping("/all-houses")
    public List<House> getAllHouses() {
        return houseService.getAllHouses();
    }



    @GetMapping("/{id}")
    public House getHouse(@PathVariable Long id) {
        return houseService.getHouse(id);
    }

    @GetMapping("/filter")
    public List<House> getHousesByFilters(
            @RequestParam(name = "minPrice", required = false) Long minPrice,
            @RequestParam(name = "maxPrice", required = false) Long maxPrice,
            @RequestParam(name = "street", required = false) String street,
            @RequestParam(name = "city", required = false) String city,
            @RequestParam(name = "province", required = false) String province,
            @RequestParam(name = "bedrooms", required = false) Integer bedrooms,
            @RequestParam(name = "bathrooms", required = false) Integer bathrooms,
            @RequestParam(name = "type", required = false) House.HouseType type,
            @RequestParam(name = "streetNumber", required = false) Integer streetNumber
    ){
        // can pass values as null and will work not be involved in filtering
        return houseService.filterHouses(minPrice, maxPrice, street, city, province, bedrooms,bathrooms, streetNumber, type);
    }

    @PostMapping("/add-house")
    public House addHouse(@Valid @RequestBody House house){
        return houseService.saveHouse(house);
    }

    @PutMapping("/house-update")
    public void updateHouse(@RequestBody House house){
        houseService.updateHouse(house);
    }

    @DeleteMapping("/house-delete/{id}")
    public void deleteHouse(@PathVariable Long id){
        houseService.deleteHouse(id);
    }

}
