package com.backend.realestatebackend;

import com.backend.realestatebackend.model.*;
import com.backend.realestatebackend.repository.BrokerRepository;
import com.backend.realestatebackend.repository.UserRepository;
import com.backend.realestatebackend.repository.ViewingRequestRepository;
import com.backend.realestatebackend.service.HouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class RealEstateBackendApplication {

	private final HouseService houseService;

	private final UserRepository userRepository;

	private final BrokerRepository brokerRepository;

	private final ViewingRequestRepository viewingRequestRepository;

	public static void main(String[] args) {
		SpringApplication.run(RealEstateBackendApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner initializeData() {
//		return args -> {
//			House_Address address1 = new House_Address("City1", "Nova Scotia", 123, "Main St", "A1B 2C3");
//			House_Address address2 = new House_Address("City2", "Manitoba", 456, "Elm St", "X0Y 1Z2");
//			House_Address address3 = new House_Address("City3", "Quebec", 790, "Oak St", "H7Y 2B7");
//			House_Address address4 = new House_Address("City3", "Yukon", 789, "Oak St", "H7Y 2B7");
//
//			// Create Brokers
//			Broker broker1 = new Broker();
//			broker1.setFirstName("John");
//			broker1.setLastName("Doe");
//			broker1.setPhoneNumber("+1 (123)-456-7890");
//			broker1.setEmail("john.doe@example.com");
//			broker1.setLocation(new Location("City1", "Ontario"));
//			broker1.setBroker_description("Broker description");
//
//			Broker broker2 = new Broker();
//			broker2.setFirstName("Jane");
//			broker2.setLastName("Smith");
//			broker2.setPhoneNumber("+1 (456)-789-0123");
//			broker2.setEmail("jane.smith@example.com");
//			broker2.setLocation(new Location("City2", "Quebec"));
//			broker2.setBroker_description("Broker description");
//
//			Broker broker3 = new Broker();
//			broker3.setFirstName("Craig");
//			broker3.setLastName("Smith");
//			broker3.setPhoneNumber("+1 (123)-456-7890");
//			broker3.setEmail("john.dove@example.com");
//			broker3.setLocation(new Location("City1", "Quebec"));
//			broker3.setBroker_description("Broker description");
//
//			Broker broker4 = new Broker();
//			broker4.setFirstName("Jon");
//			broker4.setLastName("Dan");
//			broker4.setPhoneNumber("+1 (123)-456-7890");
//			broker4.setEmail("john.doel@example.com");
//			broker4.setLocation(new Location("City1", "Nova Scotia"));
//			broker4.setBroker_description("Broker description");
//
//			brokerRepository.save(broker1);
//			brokerRepository.save(broker2);
//			brokerRepository.save(broker3);
//			brokerRepository.save(broker4);
//
//			House house1 = new House(address3, House.HouseStatus.FOR_SALE, House.HouseType.CONDO, 100000L, 3, 2,
//					broker1, 1, 500D);
//			House house2 = new House(address4, House.HouseStatus.FOR_SALE, House.HouseType.APARTMENT, 150000L, 4, 3,
//					broker2, 2, 1000D);
//			House house3 = new House(address1, House.HouseStatus.FOR_SALE, House.HouseType.HOUSE, 200000L, 5, 3,
//					broker1, null, 2050D);
//
//
//
//
//			house1.setHouse_description("House description");
//			house2.setHouse_description("House description");
//			house3.setHouse_description("House description");
//			house1.setStatus(House.HouseStatus.FOR_LEASE);
//			houseService.saveHouse(house1,1L);
//			houseService.saveHouse(house2,2L);
//			houseService.saveHouse(house3,1L);
//
//			User user1 = new User();
//			user1.setFirst_name("Alice");
//			user1.setLast_name("Johnson");
//			user1.setEmail("alice.j@example.com");
//			userRepository.save(user1);
//
//			User user2 = new User();
//			user2.setFirst_name("Bob");
//			user2.setLast_name("Smith");
//			user2.setEmail("bob.smith@example.com");
//			userRepository.save(user2);
//
//			User user3 = new User();
//			user3.setFirst_name("Charlie");
//			user3.setLast_name("Brown");
//			user3.setEmail("charlie.b@example.com");
//			userRepository.save(user3);
//
//			// Assign Houses to Brokers
//
//
//			// Create a viewing request
//			ViewingRequest viewingRequest = new ViewingRequest(user1.getFirst_name(), user1.getLast_name(), user1.getEmail(), house1.getHouseId(),user1.getId() ,broker1.getBrokerId(),"Some description", List.of("Monday", "Wednesday"));
//			viewingRequestRepository.save(viewingRequest);
//			user1.getViewingRequests().add(viewingRequest);
//			broker1.getViewingRequests().add(viewingRequest);
//
//			userRepository.save(user1);
//			brokerRepository.save(broker1);
//





//		};
//	}

}
