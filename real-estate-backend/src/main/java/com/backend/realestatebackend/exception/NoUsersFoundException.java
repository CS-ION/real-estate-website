package com.backend.realestatebackend.exception;

public class NoUsersFoundException extends RuntimeException{

    public NoUsersFoundException(){
        super("No users were found in the database");
    }
    public NoUsersFoundException(String msg){
        super(msg);
    }
}
