package com.backend.realestatebackend;

import com.backend.realestatebackend.model.Address;
import com.backend.realestatebackend.model.House;
import com.backend.realestatebackend.repository.HouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
@RequiredArgsConstructor
public class RealEstateBackendApplication {

	private final HouseRepository houseRepository;


	public static void main(String[] args) {
		SpringApplication.run(RealEstateBackendApplication.class, args);
	}


	@Bean
	public CommandLineRunner initializeData() {
		return args -> {
			// Create Address objects
			Address address1 = new Address(123, "Main St", "City1", "Province1", "A1B 2C3");
			Address address2 = new Address(456, "Elm St", "City2", "Province2", "X0Y 1Z2");
			Address address3 = new Address(789, "Oak St", "City3", "Province3", "H7Y 2B7");
			House house1 = new House(address3, 100000L, 3);
			House house2 = new House(address2, 150000L, 4);
			House house3 = new House(address1, 200000L, 5);
			houseRepository.saveAll(Arrays.asList(house1, house2, house3));
		};
	}



}
