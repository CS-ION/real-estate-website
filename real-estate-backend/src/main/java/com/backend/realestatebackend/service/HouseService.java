package com.backend.realestatebackend.service;

import com.backend.realestatebackend.exception.DuplicateAddressException;
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
        return houseRepository.findById(id).orElseThrow(()-> {throw new HouseNotFoundException(id);});
    }

    public List<House> filterHouses(Long minPrice,
                                    Long maxPrice,
                                    String street,
                                    String city,
                                    String province,
                                    Integer bedrooms,
                                    Integer bathrooms,
                                    Integer streetNumber,
                                    House.HouseType type){

        List<House> houses = houseRepository.findByFilters(minPrice, maxPrice, street, city, province, bedrooms,bathrooms ,streetNumber,type);
        if(houses.isEmpty())throw new NoHousesFoundException("No houses listed with given filters");
        return houses;
    }

    public House saveHouse(House house){
        houseRepository.findByAddress(house.getAddress()).ifPresent((h) -> {throw new DuplicateAddressException();});
        return houseRepository.save(house);
    }

    public void updateHouse(House updatedHouse){
        if(houseRepository.findById(updatedHouse.getHouseId()).isEmpty())return;
        houseRepository.save(updatedHouse);
    }

    public void deleteHouse(Long id){
         houseRepository.deleteById(id);
    }



}
