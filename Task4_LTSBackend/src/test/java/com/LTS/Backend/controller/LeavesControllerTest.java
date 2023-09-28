package com.LTS.Backend.controller;

import com.LTS.Backend.dto.ReactToLeaveRequestDTO;
import com.LTS.Backend.models.Leaves;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class LeavesControllerTest {

  @Autowired
  private TestRestTemplate restTemplate;

// get-leave
  @Test
  public void getLeaveWithExistingUserAndDates() {
    String startDate = "2023-09-26T16:09";
    String endDate = "2023-09-29T16:10";
    Long userId = 1L;

    ResponseEntity<?> response = restTemplate.getForEntity("/employee/get-leave?startDate=" + startDate +
      "&endDate=" + endDate + "&userId=" + userId, Object.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }


  @Test
  public void getLeaveWithNonexistentUser() {
    String startDate = "2023-10-01";
    String endDate = "2023-10-05";
    Long userId = 999L;

    ResponseEntity<?> response = restTemplate.getForEntity("/employee/get-leave?startDate=" + startDate +
      "&endDate=" + endDate + "&userId=" + userId, Object.class);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
  }


  //get-leave-history

  @Test
  public void getLeavesByStatusWithExistingUser() {
    Long userId = 1L;

    ResponseEntity<?> response = restTemplate.getForEntity("/manager/leave-history/" + userId, Object.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

  @Test
  public void getLeavesByStatusWithNonexistentUser() {
    Long userId = 999L;

    ResponseEntity<?> response = restTemplate.getForEntity("/manager/leave-history/" + userId, String.class);
    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
  }

  // react-to-leave

  @Test
  public void reactToLeaveWithValidData() {
    // Test reacting to leave with valid data
    ReactToLeaveRequestDTO request = new ReactToLeaveRequestDTO();
    request.setUserId("1"); // Replace with an existing user ID in your database
    request.setStartDate("2023-09-26T16:09");
    request.setEndDate("2023-09-29T16:10");
    request.setStatus("Accepted");
    request.setManagerReason("Approved for vacation");


    ResponseEntity<Leaves> response = restTemplate.postForEntity("/manager/react-to-leave", request, Leaves.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

  @Test
  public void reactToLeaveWithInvalidData() {
    ReactToLeaveRequestDTO request = new ReactToLeaveRequestDTO();

    request.setUserId("1"); // Replace with an existing user ID in your database
    request.setStartDate("2023-09-26T16:09");
    request.setEndDate("2023-09-29T16:10");
    request.setStatus("aprroved");
    request.setManagerReason("Approved for vacation");

    ResponseEntity<Leaves> response = restTemplate.postForEntity("/manager/react-to-leave", request, Leaves.class);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
  }


  // delete-leave

//  @Test
//  public void deleteLeaveWithValidData() {
//    String startDate = "2023-09-26T16:07";
//    String endDate = "2023-09-28T16:07";
//    Long userId = 1L;
//
//    ResponseEntity<?> response = restTemplate.exchange(
//      "/employee/delete-leave?startDate=" + startDate + "&endDate=" + endDate + "&userId=" + userId,
//      HttpMethod.DELETE,
//      null,
//      Object.class);
//
//    assertEquals(HttpStatus.OK, response.getStatusCode());
//  }
}
