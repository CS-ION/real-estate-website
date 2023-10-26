package com.backend.realestatebackend;

import com.backend.realestatebackend.model.*;
import com.backend.realestatebackend.repository.BrokerRepository;
import com.backend.realestatebackend.repository.UserRepository;
import com.backend.realestatebackend.service.HouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
@RequiredArgsConstructor
public class RealEstateBackendApplication {

	private final HouseService houseService;

	private final UserRepository userRepository;

	private final  BrokerRepository brokerRepository;


	public static void main(String[] args) {
		SpringApplication.run(RealEstateBackendApplication.class, args);
	}


	@Bean
	public CommandLineRunner initializeData() {
		return args -> {
			House_Address address1 = new House_Address("City1", "Main St", 123, "Province1", "A1B 2C3");
			House_Address address2 = new House_Address("City2", "Elm St",456 , "Province2", "X0Y 1Z2");
			House_Address address3 = new House_Address("City3", "Oak St",790, "Province3", "H7Y 2B7");
			House_Address address4 = new House_Address("City3", "Oak St",789 , "Province3", "H7Y 2B7");


			// Create Brokers
			Broker broker1 = new Broker();
			broker1.setFirstName("John");
			broker1.setLastName("Doe");
			broker1.setPhoneNumber("+1 (123)-456-7890");
			broker1.setEmail("john.doe@example.com");
			broker1.setLocation(new Location("City1", "Province1"));

			Broker broker2 = new Broker();
			broker2.setFirstName("Jane");
			broker2.setLastName("Smith");
			broker2.setPhoneNumber("+1 (456)-789-0123");
			broker2.setEmail("jane.smith@example.com");
			broker2.setLocation(new Location("City2", "Province2"));

			Broker broker3 = new Broker();
			broker3.setFirstName("Craig");
			broker3.setLastName("Smith");
			broker3.setPhoneNumber("+1 (123)-456-7890");
			broker3.setEmail("john.dove@example.com");
			broker3.setLocation(new Location("City1", "Province1"));

			Broker broker4 = new Broker();
			broker4.setFirstName("Jon");
			broker4.setLastName("Dan");
			broker4.setPhoneNumber("+1 (123)-456-7890");
			broker4.setEmail("john.doel@example.com");
			broker4.setLocation(new Location("City1", "Province1"));

			brokerRepository.save(broker1);
			brokerRepository.save(broker2);
			brokerRepository.save(broker3);
			brokerRepository.save(broker4);

			House house1 = new House(address3, House.HouseStatus.FOR_SALE, House.HouseType.CONDO, 100000L, 3, 2, broker1, null,500D);
			House house2 = new House(address4, House.HouseStatus.FOR_SALE, House.HouseType.APARTMENT, 150000L, 4, 3, broker2, null,1000D);
			House house3 = new House(address1, House.HouseStatus.FOR_SALE, House.HouseType.HOUSE, 200000L, 5, 3, broker1, "Unit A",2050D);

			houseService.saveHouse(house1);
			houseService.saveHouse(house2);
			houseService.saveHouse(house3);

			// Assign Houses to Brokers
			broker1.getHouses().add(house1);
			broker1.getHouses().add(house2);
			broker2.getHouses().add(house2);
			broker2.getHouses().add(house3);



		};
	}




}
