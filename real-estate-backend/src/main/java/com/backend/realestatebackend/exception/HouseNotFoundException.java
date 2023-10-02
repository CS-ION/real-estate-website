package com.backend.realestatebackend.exception;

public class HouseNotFoundException extends RuntimeException{
    public HouseNotFoundException(Long id){
        super("House was not found with id: "+id);
    }
}
