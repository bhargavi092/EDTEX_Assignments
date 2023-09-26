import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,NgForm,Validators } from '@angular/forms';
import { AllPatrons } from '../all-patrons';
// import { PatronService } from '../patron.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addpatron',
  templateUrl:'./addpatron.component.html',
  styleUrls: ['./addpatron.component.css']
})
export class AddpatronComponent {

  toggleSideNav = true;
  showLogoutDropdown = false;
  userType: string ='';
  username: string = '';
  paramsObject : any;

  addPatronForm : FormGroup;
  // id : number=0;
  pname : string ="";
  // borrowedBooks : string[]=[""];
  quantity : number=0;


  constructor(private formBuilder : FormBuilder ,  private router : Router,private route: ActivatedRoute){
    this.addPatronForm = formBuilder.group({
      // id : ['',Validators.required],
      pname : ['',Validators.required],
    })
  }

  addPatron(){
    if(this.addPatronForm.valid){
      // console.log(this.addPatronForm.value);
      // const newPatron = this.addPatronForm.value;
      // this.patronService.addPatron(newPatron)
      // this.addPatronForm.reset()
      // alert("Patron added Successfully")
    }
    this.router.navigate(['/viewbook'], {queryParams: { userType:this.userType, username : this.username }})

  }

  toggleLogoutDropdown() {
    this.showLogoutDropdown = !this.showLogoutDropdown;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = {};
      params.keys.forEach(key => {
        this.paramsObject[key] = params.get(key);
      });
      console.log(this.paramsObject);
      this.userType = this.paramsObject.userType;
      this.username = this.paramsObject.username;
  

    });
  }

  logout() {
    localStorage.removeItem(this.userType)
    this.router.navigateByUrl('/');
  }
}


