import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
    registerClicked : boolean =false;

    registerForm : FormGroup;
    username:string =''
    password: string=''
    email : string=''
    number:string=''
    
    constructor(private formBulider:FormBuilder, private router: Router){
      this.registerForm = formBulider.group(
        {
          username : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
          password : ['',[Validators.required,Validators.minLength(8)]],
          email : ['',[Validators.required, Validators.email]],
          number : ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
          // usertype: ['', Validators.required]
        }
      )
    }

    register(){
      this.registerClicked = true;
      let registeredUsers: any[] = [];


      if (this.registerForm.valid) {
        
        const registrationData = {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          email: this.registerForm.value.email,
          number: this.registerForm.value.number,
          // usertype: this.registerForm.value.usertype
        };

        const registeredUsersString = localStorage.getItem('registrationData');
        const existingUsersData = registeredUsersString ? JSON.parse(registeredUsersString) : [];

        // const existingUsersData = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        existingUsersData.push(registrationData);

        localStorage.setItem('registrationData', JSON.stringify(existingUsersData));
    
        this.router.navigate(['/']);
      }
    }
}
