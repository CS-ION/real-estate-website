package com.backend.realestatebackend.exception;

public class DuplicateAddressException extends RuntimeException {
    public DuplicateAddressException(){
        super("A house with the same address already exists");
    }
}
