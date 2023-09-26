import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patron-registration',
  templateUrl: './patron-registration.component.html',
  styleUrls: ['./patron-registration.component.css']
})
export class PatronRegistrationComponent {
  registerClicked : boolean =false;

  userType: string ='';
  uname: string = '';
  paramsObject : any;

  registerForm : FormGroup;
  username:string =''
  password: string=''
  email : string=''
  number:string=''
  
  constructor(private formBulider:FormBuilder, private router: Router,private route: ActivatedRoute){
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
        borrowBooks: []
        // usertype: this.registerForm.value.usertype
      };

      const registeredUsersString = localStorage.getItem('PatronRegistrationData');
      const existingUsersData = registeredUsersString ? JSON.parse(registeredUsersString) : [];
      const nextId = existingUsersData.length;

      const newPatron = {
        id: nextId + 1,
        ...registrationData
      }

      existingUsersData.push(newPatron);

      // existingUsersData.push(registrationData);

      localStorage.setItem('PatronRegistrationData', JSON.stringify(existingUsersData));

      alert('Patron added successfully')
  
      this.router.navigate(['/viewpatron'], {queryParams: { userType:this.userType, username : this.uname }} );
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = {};
      params.keys.forEach(key => {
        this.paramsObject[key] = params.get(key);
      });
      console.log(this.paramsObject);
      this.userType = this.paramsObject.userType;
      this.uname = this.paramsObject.username;
      
    });
  }
}
