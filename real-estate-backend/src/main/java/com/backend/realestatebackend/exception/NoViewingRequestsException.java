package com.backend.realestatebackend.exception;

public class NoViewingRequestsException extends RuntimeException{
    public NoViewingRequestsException(){
        super("No viewing requests currently made.");
    }
}
