package com.backend.realestatebackend.service;

import com.backend.realestatebackend.exception.HouseNotFoundException;
import com.backend.realestatebackend.exception.NoHousesFoundException;
import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.repository.HouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HouseService {
    private final HouseRepository houseRepository;
    public List<House> getAllHouses(){
        List<House> houses = houseRepository.findAll();
        if(houses.isEmpty())throw new NoHousesFoundException();
        return houses;
    }
    public House getHouse(Long id){
        return houseRepository.findById(id).orElseThrow(()->  new HouseNotFoundException(id));
    }
    public List<House> findByPriceBetween(Long min, Long max){
        List<House> houses = houseRepository.findByPriceBetween(min,max);
        if(houses.isEmpty()) throw new NoHousesFoundException("No houses found within this price range");
        return houses;
    }

    public List<House> findHousesByStreet(String street) {
        List<House> houses = houseRepository.findByAddressStreet(street);
        if(houses.isEmpty())throw new NoHousesFoundException("No houses listed with given street");
        return houses;
    }

    public List<House> filterHouses(Long minPrice,
                                    Long maxPrice,
                                    String street,
                                    String city,
                                    String province,
                                    Integer bedrooms,
                                    Integer streetNumber){

        List<House> houses = houseRepository.findByFilters(minPrice, maxPrice, street, city, province, bedrooms, streetNumber);
        if(houses.isEmpty())throw new NoHousesFoundException("No houses listed with given filters");
        return houses;
    }



}
