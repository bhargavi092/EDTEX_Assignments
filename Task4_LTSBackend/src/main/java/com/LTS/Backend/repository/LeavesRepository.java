package com.LTS.Backend.repository;

import com.LTS.Backend.models.Leaves;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Array;
import java.util.List;

public interface LeavesRepository extends JpaRepository<Leaves, Long> {

    public List<Leaves> findByUserId(Long userId);

    Leaves findByLeaveId(Long leaveId);


//    Leaves findByLeaveId(String startDate, String endDate, String userId);
    Leaves findByStartDateAndEndDateAndId(String startDate, String endDate, Long userId);

    List<Leaves> findByStatus(String leaveStatus);

    List<Leaves> findByStatusIn(List leavesStatus);


}
