package com.LTS.Backend.dto;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

@Data
public class ReactToLeaveRequestDTO {
    private String userId;
    private String startDate;
    private String endDate;
//    private Long managerId;
    private String status;
    private String managerReason;
}
