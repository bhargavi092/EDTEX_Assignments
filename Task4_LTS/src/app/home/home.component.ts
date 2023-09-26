import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  currentUser: UserRegister = {
    role: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    leaves: [],
    numberOfLeaves: 0,
  };
  ngOnInit(): void {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
      //if there is already user data in the cookie storage
      //then redirect them to respective dashboards
      if (this.currentUser.role === 'employee') {
        window.location.href = 'http://localhost:4200/employee';
      } else {
        window.location.href = 'http://localhost:4200/manager';
      }
    }
  }
}
