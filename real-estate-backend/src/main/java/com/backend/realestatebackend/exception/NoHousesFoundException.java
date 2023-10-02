package com.backend.realestatebackend.exception;

public class NoHousesFoundException extends RuntimeException{
    public NoHousesFoundException(){
        super("No houses were found in the database");
    }
    public NoHousesFoundException(String msg){
        super(msg);
    }
}
