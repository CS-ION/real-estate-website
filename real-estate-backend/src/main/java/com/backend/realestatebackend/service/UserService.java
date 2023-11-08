package com.backend.realestatebackend.service;


import com.backend.realestatebackend.exception.*;
import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.User;
import com.backend.realestatebackend.model.ViewingRequest;
import com.backend.realestatebackend.repository.BrokerRepository;
import com.backend.realestatebackend.repository.HouseRepository;
import com.backend.realestatebackend.repository.UserRepository;
import com.backend.realestatebackend.repository.ViewingRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final HouseService houseService;
    private final BrokerService brokerService;
    private final ViewingRequestRepository viewingRequestRepository;



    public List<User> getAllUsers(){
        List<User> users = userRepository.findAll();
        if (users.isEmpty())
            throw new NoUsersFoundException();
        return users;
    }
    public User getUser(Long id){
        return userRepository.findById(id).orElseThrow(() -> {
            throw new UserNotFoundException(id);
        });
    }

    public void favouriteHouse(Long userId,Long houseId){
        User user = userRepository.findById(userId).orElseThrow(); // add custom exception if needed
        user.getFavoredHouses().add(houseService.getHouse(houseId));
        userRepository.save(user);
    }

    public void removeFavouriteHouse(Long userId,Long houseId){
        User user = userRepository.findById(userId).orElseThrow(); // add custom exception if needed
        user.getFavoredHouses().remove(houseService.getHouse(houseId));
        userRepository.save(user);
    }

    public void requestViewing(Long userId, Long houseId, String availabilityDescription, List<String> availability){
        User user = userRepository.findById(userId).orElseThrow();
        Broker broker = houseService.getHouse(houseId).getBroker();
        ViewingRequest viewingRequest = new ViewingRequest(user.getFirst_name(), user.getLast_name(), user.getEmail(), houseId,userId,broker.getBrokerId(),availabilityDescription, availability);
        user.getViewingRequests().add(viewingRequest);
        broker.getViewingRequests().add(viewingRequest);
        viewingRequestRepository.save(viewingRequest);
        userRepository.save(user);
        brokerService.updateBroker(broker);
    }

    public Set<ViewingRequest> getViewingRequests(Long id){
        Set<ViewingRequest> viewingRequests = userRepository.findById(id).orElseThrow().getViewingRequests();
        if(viewingRequests.isEmpty()) throw new NoViewingRequestsException();
        return viewingRequests;
    }

    public void deleteUserViewingRequest(Long userId, Long viewingRequestId) {
        User user = userRepository.findById(userId).orElseThrow();
        ViewingRequest viewingRequest = viewingRequestRepository.findById(viewingRequestId).orElseThrow();
        user.getViewingRequests().remove(viewingRequest);
        userRepository.save(user);
        Broker broker = brokerService.getBroker(viewingRequest.getBrokerId());
        if (!user.getViewingRequests().contains(viewingRequest) && !broker.getViewingRequests().contains(viewingRequest)) {
            viewingRequestRepository.delete(viewingRequest);
        }
    }
}
