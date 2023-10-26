package com.backend.realestatebackend.controller;

import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.service.BrokerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/add-broker")
    public Broker addBroker(@RequestBody @Valid Broker broker){
        return brokerService.addBroker(broker);
    }

    @DeleteMapping("/delete-broker/{id}")
    public void deleteBroker(@PathVariable Long id){
        brokerService.deleteBroker(id);
    }
}
