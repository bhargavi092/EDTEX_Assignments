import { Component, OnInit } from '@angular/core';
import { UserRegister, Leave } from '../User';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-track-leaves',
  templateUrl: './track-leaves.component.html',
  styleUrls: ['./track-leaves.component.css'],
})
export class TrackLeavesComponent implements OnInit {
  currentUser: UserRegister & { id: number } = {
    id: 0,
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    leaves: [],
    numberOfLeaves: 0,
  };
  deleteIcon = faTrashCan;
  editIcon = faPenToSquare;
  leaves: Leave[] = [];

  constructor(private httpClient: HttpClient) {}


  ngOnInit(): void {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }else{
      window.location.href='http://localhost:4200/login'
    }
  

    this.fetchLeaves();

  
  }

  fetchLeaves(): void {
    this.httpClient
      .get<Leave[]>(`http://localhost:8080/employee/track-leaves/${this.currentUser.id}`)
      .subscribe(
        (response) => {
          if (response) {
            this.leaves = response;
            console.log(response);
          } else {
            this.leaves = [];
          }
        },
        (error) => {
          console.error('Error fetching leaves data:', error);
        }
      );
  }

  delete(leave: Leave) {
    console.log(leave)
    const params = {
      startDate: leave.startDate,  
      endDate: leave.endDate,
      userId: this.currentUser.id  
    };
    this.httpClient
    .delete(`http://localhost:8080/employee/delete-leave?startDate=${params.startDate}&endDate=${params.endDate}&userId=${params.userId}`)
      .subscribe(
        () => {
          console.log('Leave deleted successfully');
          this.fetchLeaves();

        },
        (error) => {
          console.error('Error deleting leave:', error);
        }
      );
  }
  
}
