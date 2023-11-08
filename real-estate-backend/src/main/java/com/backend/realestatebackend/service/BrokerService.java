package com.backend.realestatebackend.service;

import com.backend.realestatebackend.exception.BrokerNotFoundException;
import com.backend.realestatebackend.exception.DuplicateEmailException;

import com.backend.realestatebackend.exception.NoHousesFoundException;
import com.backend.realestatebackend.exception.NoViewingRequestsException;
import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.model.User;
import com.backend.realestatebackend.model.ViewingRequest;
import com.backend.realestatebackend.repository.BrokerRepository;
import com.backend.realestatebackend.repository.UserRepository;
import com.backend.realestatebackend.repository.ViewingRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class BrokerService {
    private final BrokerRepository brokerRepository;
    private final ViewingRequestRepository viewingRequestRepository;

    private final UserRepository userRepository;


    public List<Broker> getAllBrokers(){
        List<Broker> brokers = brokerRepository.findAll();
        if(brokers.isEmpty())throw new NoHousesFoundException();
        return brokers;
    }

    public Broker getBroker(Long id){
        return brokerRepository.findById(id).orElseThrow(()-> {throw new BrokerNotFoundException(id);});

    }

    public Set<House> getBrokersHouses(Long id){
        return brokerRepository.findById(id).get().getHouses();
    }

    public Set<ViewingRequest> getViewingRequests(Long id){
        Set<ViewingRequest> viewingRequests = brokerRepository.findById(id).orElseThrow().getViewingRequests();
        if(viewingRequests.isEmpty()) throw new NoViewingRequestsException();
        return viewingRequests;
    }
    public void deleteBrokerViewingRequest(Long brokerId, Long viewingRequestId) {
        Broker broker = brokerRepository.findById(brokerId).orElseThrow();
        ViewingRequest viewingRequest = viewingRequestRepository.findById(viewingRequestId).orElseThrow();
        broker.getViewingRequests().remove(viewingRequest);
        brokerRepository.save(broker);
        User user = userRepository.findById(viewingRequest.getUserId()).orElseThrow();
        if (!user.getViewingRequests().contains(viewingRequest) && !broker.getViewingRequests().contains(viewingRequest)) {
            viewingRequestRepository.delete(viewingRequest);
        }
    }

    public Broker addBroker(Broker broker){
        if(brokerRepository.findByEmail(broker.getEmail()).isPresent())throw new DuplicateEmailException();
        return brokerRepository.save(broker);
    }

    public void updateBroker(Broker broker){
        brokerRepository.save(broker);
    }

    public void deleteBroker(Long brokerId) {
            brokerRepository.deleteById(brokerId);
        }

    }




