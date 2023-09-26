import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../User';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  currentUser: UserRegister = {
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    leaves: [],
    numberOfLeaves: 0,
  };

  remainingLeaves: number = 0; 
  ngOnInit(): void {
    const currentUserData = localStorage.getItem('currentUser');
    const remainingLeavesStr = localStorage.getItem('remainingLeaves');

    if (remainingLeavesStr) {
      this.remainingLeaves = parseInt(remainingLeavesStr, 10);
    }

    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }else{
      window.location.href='http://localhost:4200/login'
    }

  }
}
