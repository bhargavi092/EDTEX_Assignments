import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Leave, UserRegister } from '../User';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-leave',
  templateUrl: './edit-leave.component.html',
  styleUrls: ['./edit-leave.component.css'],
})
export class EditLeaveComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpClient:HttpClient
  ) {}
  leaves: Leave[] = [];
  // leaveId = '';
  userId ='';
  currentUser: UserRegister = {
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    leaves: [],
    numberOfLeaves: 0,
  };
  leave: Leave & { leaveId: number } = {
    leaveId:0,
    id: '',
    name: this.currentUser.name,
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: '',
    managerReason: '',
  };
  message = '';
  displayMessage = false;

  ngOnInit(): void {
    //taking the param from the route
    this.userId = this.route.snapshot.params['id'];
    this.leave.startDate = this.route.snapshot.queryParams['startDate'];
    this.leave.endDate = this.route.snapshot.queryParams['endDate'];

    console.log(localStorage.getItem("currentUser"))

    this.httpClient
      .get<Leave & { leaveId: number } >(
        `http://localhost:8080/employee/get-leave?startDate=${this.leave.startDate}&endDate=${this.leave.endDate}&userId=${this.userId}`
      )
      .subscribe(
        (response) => {
          if (response) {
            this.leave = response;
            console.log("edit-leave:got leave:",this.leave)
          } else {
            console.log("at edit-leave , response failed")
          }
        },
        (error) => {
          console.error('Error fetching leaves data:', error);
        }
      );  
      }

   
  
  //function for saving the changes
  save() {
    this.httpClient
      .put(`http://localhost:8080/employee/update-leave`, this.leave)
      .subscribe(
        (response) => {
          console.log('Leave updated successfully');
        },
        (error) => {
          console.error('Error updating leave:', error);
        }
      );
    }
}
