import { Component, OnInit } from '@angular/core';
import { UserRegister } from './User';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'LTS';
  userIcon = faUserCircle;
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
    //retrieving current user data so as to display the name of user on the nav bar
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }
    const numberOfLeavesData = localStorage.getItem('numberOfLeaves');
    if(numberOfLeavesData){
      console.log(JSON.parse(numberOfLeavesData));
    }
    else{
      localStorage.setItem('numberOfLeaves',JSON.stringify(10));
    }
  }
  async logout() {
    //removing user from cookie storage as he/she is logged out
    localStorage.removeItem('currentUser')
    window.location.href = 'http://localhost:4200/';
  }
}
