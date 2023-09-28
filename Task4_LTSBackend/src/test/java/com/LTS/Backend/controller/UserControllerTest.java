package com.LTS.Backend.controller;

import com.LTS.Backend.Config;
import com.LTS.Backend.models.User;
import com.LTS.Backend.request.UserLoginRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Import(Config.class)
class UserControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

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

    @Test
    @Disabled
    public void registerWithInvalidDetails() {
        User user = new User();

        user.setName("Blue");
        user.setEmail("n180122@rguktn.ac.in");
        user.setRole("employee");
        user.setPassword("123");
        user.setNumberOfLeaves(11);
        user.setPhone("9876543210");

        ResponseEntity<Object> response = restTemplate.postForEntity("/register", user, Object.class);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }


    @Test
//    @Disabled
    public void loginWithValidCredentials() {
        UserLoginRequest userLoginRequest = new UserLoginRequest();
        userLoginRequest.setEmail("blue@gmail.com");
        userLoginRequest.setPassword("123456");

        ResponseEntity<User> response = restTemplate.postForEntity("/login", userLoginRequest, User.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
//    @Disabled
    public void loginWithInvalidCredentials() {
        UserLoginRequest userLoginRequest = new UserLoginRequest();
        userLoginRequest.setEmail("blue@gmail.com");
        userLoginRequest.setPassword("password");

        ResponseEntity<User> response = restTemplate.postForEntity("/login", userLoginRequest, User.class);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
//    @Disabled
    public void loginWithNonexistentUser() {
        UserLoginRequest userLoginRequest = new UserLoginRequest();
        userLoginRequest.setEmail("no@gmail.com");
        userLoginRequest.setPassword("password");

        ResponseEntity<User> response = restTemplate.postForEntity("/login", userLoginRequest, User.class);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }


  @Test
  public void updateAllEmployeesLeaveCount() {
    int updatedLeaveCount = 20;

    ResponseEntity<?> response = restTemplate.postForEntity(
      "/manager/settings/" + updatedLeaveCount,
      null,
      Object.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

}
