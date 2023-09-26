import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,NgForm,Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
  usertype: string;
  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginClicked = false;

  loginForm : FormGroup;
  username : string="";
  password : string ="";


    constructor(private formBuilder: FormBuilder,private router: Router){
      this.loginForm = formBuilder.group({
        username : ['',Validators.required],
        password : ['',Validators.required],
      })
    }

    login(){
      this.loginClicked = true;
      if (this.loginForm.valid) {

        const data = {
          username:this.loginForm.value.username,
          password: this.loginForm.value.password
        };

        const registeredUsersString = localStorage.getItem('registrationData');
        const existingUsersData = registeredUsersString ? JSON.parse(registeredUsersString) : [];

        const checkUser = existingUsersData.find((user : User) => {
          return user.username === data.username && user.password === data.password ;
        });
        if(checkUser){
            console.log(this.loginForm.value.username)
            localStorage.setItem('librarian',JSON.stringify(data));
        
            // this.router.navigateByUrl('/viewbook');
            // this.router.navigateByUrl(`/viewbook?userType=${this.loginForm.value.userType}`);
            this.router.navigate(['/viewbook'], {queryParams: { userType:'librarian', username : this.loginForm.value.username }})
        }
        else{
          alert("You are not registred  as librarian yet! Register now.. (Or) invalid username or password")
          // this.loginForm.reset()
        }
        
       

      }
    }
}
