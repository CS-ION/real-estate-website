package com.backend.realestatebackend.exception;

public class DuplicateEmailException extends RuntimeException{
    public DuplicateEmailException(){
        super("Email already exists");
    }
    public DuplicateEmailException(String message) {
        super(message);
    }
}
