package com.LTS.Backend;

import com.LTS.Backend.controller.UserController;
import com.LTS.Backend.models.User;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Import(Config.class)
class LtsBackendApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;
//	@Autowired
//	private UserController userController;
//
//	@Test
//	void contextLoads() throws Exception{
//		assertThat(userController).isNotNull();
//	}

	@Test
	@Disabled
	public void registerWithValidDetails(){
		User user = new User();

		user.setName("Blue");
		user.setEmail("blue@gmail.com");
		user.setRole("employee");
		user.setPassword("123456");
		user.setNumberOfLeaves(11);
		user.setPhone("9876543210");

		ResponseEntity<Object> response = restTemplate.postForEntity("/register",user, Object.class);

		assertEquals(HttpStatus.OK , response.getStatusCode());

	}



}
