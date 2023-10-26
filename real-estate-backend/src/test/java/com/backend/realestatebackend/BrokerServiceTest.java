package com.backend.realestatebackend;
import com.backend.realestatebackend.exception.BrokerNotFoundException;
import com.backend.realestatebackend.exception.DuplicateEmailException;
import com.backend.realestatebackend.exception.NoViewingRequestsException;
import com.backend.realestatebackend.model.Broker;
import com.backend.realestatebackend.model.ViewingRequest;
import com.backend.realestatebackend.repository.BrokerRepository;
import com.backend.realestatebackend.service.BrokerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import java.util.*;


import static org.junit.jupiter.api.Assertions.*;
public class BrokerServiceTest {

    @InjectMocks
    private BrokerService brokerService;

    @Mock
    private BrokerRepository brokerRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllBrokers() {
        // Create a list of brokers for testing
        List<Broker> brokers = new ArrayList<>();
        brokers.add(new Broker());
        brokers.add(new Broker());

        // Mock the behavior of the repository
        Mockito.when(brokerRepository.findAll()).thenReturn(brokers);

        // Call the method to test
        List<Broker> result = brokerService.getAllBrokers();

        // Assert the result
        assertEquals(2, result.size());
    }

    @Test
    public void testGetBroker() {
        // Create a mock Broker
        Broker mockBroker = new Broker();
        mockBroker.setBrokerId(1L);

        // Mock the behavior of the repository
        Mockito.when(brokerRepository.findById(1L)).thenReturn(Optional.of(mockBroker));

        // Call the method to test
        Broker result = brokerService.getBroker(1L);

        // Assert the result
        assertEquals(1L, result.getBrokerId());
    }

    @Test
    public void testGetBrokerNotFound() {
        // Mock the behavior of the repository to return an empty optional
        Mockito.when(brokerRepository.findById(1L)).thenReturn(Optional.empty());

        // Call the method to test and assert that it throws an exception
        assertThrows(BrokerNotFoundException.class, () -> brokerService.getBroker(1L));
    }





    @Test
    public void testAddBroker() {
        // Create a mock Broker
        Broker mockBroker = new Broker();
        mockBroker.setEmail("test@example.com");

        // Mock the behavior of the repository
        Mockito.when(brokerRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());
        Mockito.when(brokerRepository.save(mockBroker)).thenReturn(mockBroker);

        // Call the method to test
        Broker result = brokerService.addBroker(mockBroker);

        // Assert the result
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    public void testAddBrokerDuplicateEmail() {
        // Create a mock Broker
        Broker mockBroker = new Broker();
        mockBroker.setEmail("duplicate@example.com");

        // Mock the behavior of the repository to return a broker with the same email
        Mockito.when(brokerRepository.findByEmail("duplicate@example.com")).thenReturn(Optional.of(mockBroker));

        // Call the method to test and assert that it throws an exception
        assertThrows(DuplicateEmailException.class, () -> brokerService.addBroker(mockBroker));
    }



}
