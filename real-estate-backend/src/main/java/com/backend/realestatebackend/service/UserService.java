package com.backend.realestatebackend.service;


import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.User;
import com.backend.realestatebackend.model.ViewingRequest;
import com.backend.realestatebackend.repository.BrokerRepository;
import com.backend.realestatebackend.repository.HouseRepository;
import com.backend.realestatebackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final HouseRepository houseRepository;

    private final BrokerRepository brokerRepository;

    public void favouriteHouse(Long userId,Long houseId){
        User user = userRepository.findById(userId).orElseThrow(); // add custom exception if needed
        user.getFavoredHouses().add(houseRepository.findById(houseId).orElseThrow());
        userRepository.save(user);
    }

    public void removeFavouriteHouse(Long userId,Long houseId){
        User user = userRepository.findById(userId).orElseThrow(); // add custom exception if needed
        user.getFavoredHouses().remove(houseRepository.findById(houseId).orElseThrow());
        userRepository.save(user);
    }

    public void requestViewing(Long userId, Long houseId, String availabilityDescription, List<String> availability){
        User user = userRepository.findById(userId).orElseThrow();
        ViewingRequest viewingRequest = new ViewingRequest(user.getFirst_name(),user.getLast_name(),user.getEmail(),houseId,availabilityDescription,availability);
        Broker broker = houseRepository.findById(houseId).orElseThrow().getBroker();
        broker.getViewingRequests().add(viewingRequest);
        brokerRepository.save(broker);

    }
}
