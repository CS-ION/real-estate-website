package com.backend.realestatebackend.exception;

public class NoBrokersFoundException extends RuntimeException{

    public NoBrokersFoundException(){
        super("No brokers were found in the database");
    }
    public NoBrokersFoundException(String msg){
        super(msg);
    }
}
