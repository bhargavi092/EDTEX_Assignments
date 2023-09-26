package com.LTS.Backend.service;

import com.LTS.Backend.models.Leaves;
import com.LTS.Backend.models.User;
import com.LTS.Backend.repository.LeavesRepository;
import com.LTS.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class LeavesService {

    @Autowired
    private LeavesRepository leavesRepository;

    private UserRepository userRepository;
    public Leaves applyLeave(Leaves leave){
        leave.setStatus("Pending");
        return leavesRepository.save(leave);
    }

    public List<Leaves> getAllUserLeaves(Long userId){
        System.out.println(userId+"at service");
//        System.out.println(leavesRepository.findByUserId(userId));

        return leavesRepository.findByUserId(userId);

    }

    public List<Leaves> getAllPendingLeaves(){
        return  leavesRepository.findByStatus("Pending");
    }

    public List<Leaves> getAllNonPendingLeaves(){
        return  leavesRepository.findByStatusIn(Arrays.asList("Accepted","Rejected"));
    }

    public Leaves reactToLeaves(Long userId,String startDate, String endDate,String status , String managerReason){
        Leaves leave = leavesRepository.findByStartDateAndEndDateAndId(startDate, endDate, userId);

        if(leave!=null && ("Accepted".equals(status)|| "Rejected".equals(status)) ){
            leave.setStatus(status);
//            leave.setApprovedManagerId(managerId);
            leave.setManagerReason(managerReason);
            return leavesRepository.save(leave);
        }
        else{
            return null;
        }
    }

    public Boolean deletePendingLeave(String startDate, String endDate,Long userId){
        Leaves leave = leavesRepository.findByStartDateAndEndDateAndId(startDate, endDate, userId);

        if(leave!=null && ("Pending".equals(leave.getStatus()) )  ){
            leavesRepository.delete(leave);
            return true;
        }
        else{
            return false;
        }
    }

    public List<Leaves> getLeaveHistoryForUser(Long id) {
        System.out.println("at leave-history service");
        return leavesRepository.findByUserId(id);
    }


    public Leaves getLeaveByStartDateEndDateAndUserId(String startDate, String endDate, Long userId) {

        Leaves leave = leavesRepository.findByStartDateAndEndDateAndId(startDate, endDate, userId);
        return leave;
    }

    public Leaves updateLeave(Leaves updatedLeave) {
        System.out.println("at update-leave service");
        System.out.println(updatedLeave);
        System.out.println( updatedLeave.getLeaveId());

        return leavesRepository.save(updatedLeave);
//
    }

    public String getUserNameByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? user.getName() : null;
    }


}
