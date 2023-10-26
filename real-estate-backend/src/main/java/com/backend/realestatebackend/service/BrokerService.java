package com.backend.realestatebackend.service;

import com.backend.realestatebackend.exception.BrokerNotFoundException;
import com.backend.realestatebackend.exception.DuplicateEmailException;

import com.backend.realestatebackend.exception.NoHousesFoundException;
import com.backend.realestatebackend.exception.NoViewingRequestsException;
import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.model.ViewingRequest;
import com.backend.realestatebackend.repository.BrokerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class BrokerService {

    private final BrokerRepository brokerRepository;
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

    public List<ViewingRequest> getViewingRequests(Long id){
        List<ViewingRequest> viewingRequests = brokerRepository.findById(id).orElseThrow().getViewingRequests();
        System.out.println(viewingRequests);
        if(viewingRequests.isEmpty()) throw new NoViewingRequestsException();
        return viewingRequests;
    }

    public Broker addBroker(Broker broker){
        if(brokerRepository.findByEmail(broker.getEmail()).isPresent())throw new DuplicateEmailException();
        return brokerRepository.save(broker);
    }

    public void deleteBroker(Long brokerId) {
            brokerRepository.deleteById(brokerId);
        }
    }




