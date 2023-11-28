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
            @RequestParam(name = "minPrice", required = false) String minPriceStr,
            @RequestParam(name = "maxPrice", required = false) String maxPriceStr,
            @RequestParam(name = "street", required = false) String streetStr,
            @RequestParam(name = "city", required = false) String cityStr,
            @RequestParam(name = "province", required = false) String provinceStr,
            @RequestParam(name = "bedrooms", required = false) String bedroomsStr,
            @RequestParam(name = "bathrooms", required = false) String bathroomsStr,
            @RequestParam(name = "type", required = false) String typeStr,
            @RequestParam(name = "streetNumber", required = false) String streetNumberStr) {

        Long minPrice = parseLong(minPriceStr);
        Long maxPrice = parseLong(maxPriceStr);
        Integer bedrooms = parseInt(bedroomsStr);
        Integer bathrooms = parseInt(bathroomsStr);
        House.HouseType type = parseHouseType(typeStr);
        Integer streetNumber = parseInt(streetNumberStr);
        String street = parseString(streetStr);
        String city = parseString(cityStr);
        String province = parseString(provinceStr);

        return houseService.filterHouses(minPrice, maxPrice, street, city, province, bedrooms, bathrooms, streetNumber,
                type);
    }

    private Long parseLong(String str) {
        return "null".equals(str) ? null : str != null && str.matches("-?\\d+") ? Long.parseLong(str) : null;
    }

    private Integer parseInt(String str) {
        return "null".equals(str) ? null : str != null && str.matches("-?\\d+") ? Integer.parseInt(str) : null;
    }

    private House.HouseType parseHouseType(String str) {
        return "null".equals(str) ? null : str != null ? House.HouseType.valueOf(str) : null;
    }

    private String parseString(String str) {
        return "null".equals(str) ? null : str;
    }

    @PostMapping("/add-house/{brokerId}")
    public House addHouse(@Valid @RequestBody House house,@PathVariable Long brokerId) {
        return houseService.saveHouse(house,brokerId);
    }

    @PutMapping("/house-update/{brokerId}")
    public void updateHouse(@RequestBody House house, @PathVariable Long brokerId) {
        houseService.updateHouse(house,brokerId);
    }

    @DeleteMapping("/house-delete/{id}")
    public void deleteHouse(@PathVariable Long id) {
        houseService.deleteHouse(id);
    }

}
