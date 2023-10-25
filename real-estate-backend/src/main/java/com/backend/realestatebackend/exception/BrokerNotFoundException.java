package com.backend.realestatebackend.exception;

public class BrokerNotFoundException extends RuntimeException{
    public BrokerNotFoundException(Long id){
        super("Broker with id: "+id+" was not found.");
    }
}
