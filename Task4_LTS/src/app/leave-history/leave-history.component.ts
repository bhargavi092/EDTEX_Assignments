import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { Leave, UserRegister } from '../User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css'],
})
export class LeaveHistoryComponent implements OnInit {
  currentUser: UserRegister & { id: number } = {
    id: 0,
    leaves: [],
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    numberOfLeaves: 0,
  };
  AcceptedLeaves: Leave[] = [];
  RejectedLeaves: Leave[] = [];
  PendingLeaves: Leave[] = [];
  leaves : Leave[]=[]
  numberOfLeaves = 0;

  constructor (private httpClient:HttpClient){}
  ngOnInit(): void {
    const currentUserData = localStorage.getItem('currentUser');
    if(currentUserData){
      this.currentUser = JSON.parse(currentUserData)
    }else{
      window.location.href='http://localhost:4200/login'
    }
    


    // this.AcceptedLeaves = this.currentUser.leaves.filter(
    //   (leave) => leave.status === 'accepted'
    // );
    // this.RejectedLeaves = this.currentUser.leaves.filter(
    //   (leave) => leave.status === 'rejected'
    // );
    // this.PendingLeaves = this.currentUser.leaves.filter(
    //   (leave) => leave.status === 'pending'
    // );
    // const leavesData = localStorage.getItem('numberOfLeaves');
    // if(leavesData){
    //   this.numberOfLeaves = JSON.parse(leavesData)
    // }

    this.httpClient
    .get<Leave[]>(`http://localhost:8080/manager/leave-history/${this.currentUser.id}`)
    .subscribe(
      (response) => {
        console.log("leave-history response")
        // Handle the response and assign leaves to the appropriate arrays
        this.AcceptedLeaves = response.filter(
          (leave) => leave.status === 'Accepted'
        );
        this.RejectedLeaves = response.filter(
          (leave) => leave.status === 'Rejected'
        );
        this.PendingLeaves = response.filter(
          (leave) => leave.status === 'Pending'
        );

        const remainingLeaves = this.currentUser.numberOfLeaves - (this.AcceptedLeaves.length + this.PendingLeaves.length);

        localStorage.setItem('remainingLeaves', remainingLeaves.toString());
      },
      (error) => {
        console.error('Error fetching leaves:', error);
      }

    );

    
  }
}
