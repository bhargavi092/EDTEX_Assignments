package com.LTS.Backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.Manager;

import lombok.ToString;
import lombok.EqualsAndHashCode;


import java.time.LocalDate;

@Setter

@Getter

@AllArgsConstructor

@NoArgsConstructor

@ToString
@Entity
@Table(name = "leaves")
public class Leaves {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id",  referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

//    @ManyToOne
//    @JsonIgnore
//    @JoinColumn(name = "approved_manager_id",  referencedColumnName = "id", insertable = false, updatable = false)
//    private User approvedManager;

    @Column(name = "id")
    private Long id;

//    @Column(name = "approved_manager_id")
//    private Long approvedManagerId;
    private String name;
    private String status;
    private String type;
    private String  startDate;
    private String endDate;
    private String reason;
    private String managerReason;



}
