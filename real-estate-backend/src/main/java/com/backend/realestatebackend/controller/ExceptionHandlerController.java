package com.backend.realestatebackend.controller;

import com.backend.realestatebackend.exception.DuplicateAddressException;
import com.backend.realestatebackend.exception.HouseNotFoundException;
import com.backend.realestatebackend.exception.NoHousesFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(NoHousesFoundException.class)
    public ResponseEntity<String> handleNoHousesFoundException(NoHousesFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(HouseNotFoundException.class)
    public ResponseEntity<String> handleNoHouseFound(HouseNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(DuplicateAddressException.class)
    public ResponseEntity<String> handleDuplicateAddress(DuplicateAddressException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ex.getMessage());
    }

}
