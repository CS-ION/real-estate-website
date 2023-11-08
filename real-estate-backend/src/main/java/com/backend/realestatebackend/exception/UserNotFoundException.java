package com.backend.realestatebackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("House was not found with id: "+id);
    }
}
