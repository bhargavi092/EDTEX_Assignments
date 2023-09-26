import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  editClicked : boolean =false;

  userType: string ='';
  uname: string = '';
  paramsObject : any;

  editForm : FormGroup;
  username:string =''
  password: string=''
  email : string=''
  number:string=''

  
  constructor(private formBulider:FormBuilder, private router: Router,private route: ActivatedRoute){
    this.editForm = formBulider.group(
      {
        username : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
        password : ['',[Validators.required,Validators.minLength(8)]],
        email : ['',[Validators.required, Validators.email]],
        number : ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
      }
    )
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
      

      const userKey = this.userType === 'librarian' ? 'registrationData' : 'PatronRegistrationData';

      const userDataString = localStorage.getItem(userKey);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userToUpdate = userData.find((user: any) => user.username === this.uname);

        if (userToUpdate) {
          this.editForm.patchValue(userToUpdate);
        }

      }

    });
  }

  editProfile(){

    this.editClicked = true;

    if (this.editForm.valid) {
      const updatedUserData = this.editForm.value;

      const userKey = this.userType === 'librarian' ? 'registrationData' : 'PatronRegistrationData';

      const userDataString = localStorage.getItem(userKey);

      if (userDataString) {
        const userData = JSON.parse(userDataString);
  
        const userToUpdateIndex = userData.findIndex((user: any) => user.username === this.uname);
  
        if (userToUpdateIndex !== -1) {

          updatedUserData.id = userData[userToUpdateIndex].id;
          updatedUserData.borrowBooks = userData[userToUpdateIndex].borrowBooks;
          userData[userToUpdateIndex] = updatedUserData;
  
          localStorage.setItem(userKey, JSON.stringify(userData));
        }
      }

      this.router.navigate(['/viewbook'], {
        relativeTo: this.route,
        queryParams: { username: updatedUserData.username },
        queryParamsHandling: 'merge' 
      });
      // this.router.navigate(['/viewbook'], { queryParams: { userType: this.userType, username: this.uname } });
    }

  }
}
