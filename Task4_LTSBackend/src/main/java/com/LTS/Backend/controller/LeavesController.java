package com.LTS.Backend.controller;

import com.LTS.Backend.dto.ReactToLeaveRequestDTO;
import com.LTS.Backend.exception.CustomErrorResponse;
import com.LTS.Backend.models.Leaves;
import com.LTS.Backend.models.User;
import com.LTS.Backend.repository.UserRepository;
import com.LTS.Backend.service.LeavesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LeavesController {

    @Autowired
    private LeavesService leavesService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/employee/apply-leave/{email}")
    public ResponseEntity<?> applyLeave(@PathVariable String email,@RequestBody Leaves leave){
        try{
          System.out.println("UserName: " + leave.getName());
          User user = userRepository.findByEmail(email);
            if( user!= null){
                Long userId = user.getId();
                leave.setId(userId);

                Leaves appliedLeave = leavesService.applyLeave(leave);
                return ResponseEntity.ok(appliedLeave);
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

        }
        catch (Exception e){
            String errorMessage = "An error occurred during leave apply:"+ e.getMessage();
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }

    @GetMapping("/employee/track-leaves/{userId}")
    public ResponseEntity<?> getAllUserLeaves(@PathVariable Long userId){

        try{
            System.out.println(userId+"at controller");
            List<Leaves> leaves = leavesService.getAllUserLeaves(userId);

            if(leaves!= null){
                return new ResponseEntity<>(leaves,HttpStatus.OK);
            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Data");
            }
        }
        catch (Exception e){
            String errorMessage = "An error occurred during leave tracking:"+ e.getMessage();
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

    }

    @GetMapping("/manager/new-requests")
    public ResponseEntity<?> getAllPendingLeaves(){
        List<Leaves> pendingLeaves = leavesService.getAllPendingLeaves();
//        System.out.println("at new-request"+pendingLeaves);
        if(!pendingLeaves.isEmpty()){
            return ResponseEntity.ok(pendingLeaves);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No data");
        }
    }

    @GetMapping("/manager/overview")
    public ResponseEntity<?> getAllPastLeaves(){
        List<Leaves> pastLeaves = leavesService.getAllNonPendingLeaves();
        if(pastLeaves!=null){
            return ResponseEntity.ok(pastLeaves);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No past leaves");
        }
    }


//    @PostMapping("/manager/react-to-leave/{leaveId}")
//    public ResponseEntity<?> reactToLeave(@PathVariable Long leaveId ,
//                                          @RequestBody ReactToLeaveRequestDTO reactToLeaveRequestDTO){
//
//        Leaves updatedLeave = leavesService.reactToLeaves(leaveId,
//                reactToLeaveRequestDTO.getStatus(),
//                reactToLeaveRequestDTO.getManagerReason()
//        );
//
//        if(updatedLeave!=null){
//            return ResponseEntity.ok(updatedLeave);
//        }
//        else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("/manager/react-to-leave")
    public ResponseEntity<?> reactToLeave(@RequestBody ReactToLeaveRequestDTO reactToLeaveRequestDTO){

        Long id = Long.parseLong(reactToLeaveRequestDTO.getUserId());

        Leaves updatedLeave = leavesService.reactToLeaves(id, reactToLeaveRequestDTO.getStartDate(),
                reactToLeaveRequestDTO.getEndDate(),
                reactToLeaveRequestDTO.getStatus(),
                reactToLeaveRequestDTO.getManagerReason()
        );

        if(updatedLeave!=null){
            return ResponseEntity.ok(updatedLeave);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

//    @PostMapping("/employee/delete-leave/{leaveId}")
//    public ResponseEntity<?> deletePendingLeave(@PathVariable Long leaveId) {
//        boolean isDeleted = leavesService.deletePendingLeave(leaveId);
//
//        if (isDeleted) {
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @DeleteMapping("/employee/delete-leave")
    public ResponseEntity<?> deleteLeave(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String userId
    ){

        Long id = Long.parseLong(userId);

        boolean isDeleted = leavesService.deletePendingLeave(startDate, endDate, id);

        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/manager/leave-history/{userId}")
    public ResponseEntity<?> getLeavesByStatus(@PathVariable Long userId) {
        System.out.println("leave-history");
        List<Leaves> leaves = leavesService.getLeaveHistoryForUser(userId);


//        System.out.println(leaves+"leave-history");
        if (!leaves.isEmpty()) {
            return new ResponseEntity<>(leaves,HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No leaves found with status: " + userId);
        }
    }


    @GetMapping("/employee/get-leave")
    public ResponseEntity<Leaves> getLeave(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String userId
    ) {

        Long id = Long.parseLong(userId);

        Leaves leave = leavesService.getLeaveByStartDateEndDateAndUserId(startDate, endDate, id);

        if (leave != null) {
            return new ResponseEntity<>(leave,HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/employee/update-leave")
    public ResponseEntity<?> updateLeave(@RequestBody Leaves updatedLeave) {
        System.out.println("at update-leave control");
        Leaves isUpdated = leavesService.updateLeave(updatedLeave);
        System.out.println("at update-leave control"+isUpdated);

        if (isUpdated!=null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


}
