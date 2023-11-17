package com.backend.realestatebackend.controller;

import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.BuyOffer;
import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.model.ViewingRequest;
import com.backend.realestatebackend.service.BrokerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/brokers")
@RequiredArgsConstructor
public class BrokerController {

    private final BrokerService brokerService;

    @GetMapping("/all-brokers")
    public List<Broker> getAllBrokers(){
        return brokerService.getAllBrokers();
    }

    @GetMapping("/{id}")
    public Broker getBroker(@PathVariable Long id){
        return brokerService.getBroker(id);
    }

    @GetMapping("/{id}/all-houses")
    public Set<House> getBrokersHouses(@PathVariable Long id){
        return brokerService.getBrokersHouses(id);
    }

    @GetMapping("/viewing-requests/{id}")
    public Set<ViewingRequest> getViewingRequests(@PathVariable Long id){return brokerService.getViewingRequests(id);}

    @DeleteMapping("/request-viewing/{broker_id}/{request_id}")
    public void deleteRequest(@PathVariable Long broker_id, @PathVariable Long request_id){
        brokerService.deleteBrokerViewingRequest(broker_id,request_id);
    }

    @GetMapping("/buy-offers/{id}")
    public Set<BuyOffer> getBuyOffers(@PathVariable Long id){return brokerService.getBroker(id).getBuyOffers();}

    @DeleteMapping("/buy-offers/{broker_id}/{buy_offer_id}")
    public void deleteBuyOffer(@PathVariable Long broker_id, @PathVariable Long buy_offer_id){
        brokerService.deleteBuyOffer(broker_id, buy_offer_id);
    }

    @PutMapping("/buy-offers/update-status/{offer_id}")
    public void changeStatus(@PathVariable Long offer_id,@RequestParam String status){
        brokerService.updateOfferStatus(offer_id, status);
    }

    @PostMapping("/add-broker")
    public Broker addBroker(@RequestBody @Valid Broker broker){
        return brokerService.addBroker(broker);
    }

    @DeleteMapping("/delete-broker/{id}")
    public void deleteBroker(@PathVariable Long id){
        brokerService.deleteBroker(id);
    }

    
}
