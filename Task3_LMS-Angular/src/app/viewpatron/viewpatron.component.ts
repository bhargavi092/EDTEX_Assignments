import { Component, OnInit  } from '@angular/core';
import { AllPatrons } from '../all-patrons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-viewpatron',
  template:`  
  <main>
   
   <nav class="navBar">
     <div class="toggler" (click)="toggleSideNav = !toggleSideNav"><h3>&#9776;</h3></div>
     
       <h2 >Library Management System</h2>
     
     <div class="user">
     <span>{{username}}</span><i class='fa fa-user-circle userIcon' (click)="toggleLogoutDropdown()"></i>
      <div class="logout-dropdown" *ngIf="showLogoutDropdown">
        <a (click)="logout()">Logout</a>
        <a [routerLink]="['/editprofile']" [queryParams]="{ userType: userType , username:username}">Edit Profile</a>

      </div>
     </div>
   </nav>
   <div class="b-container">
     <div class="side-nav" [class.open]="toggleSideNav">
       <a [routerLink]="['/viewbook']" [queryParams]="{ userType: userType , username:username}"> Books</a>
       <a [routerLink]="['/viewpatron']" [queryParams]="{ userType: userType, username:username}"> Patrons</a>
       
     </div>
     <div class="content">
  <div class="viewpatrons-container">
  <div class="viewpatrons-heading"><h3>Patron Details</h3></div>
  <div class="search" *ngIf="userType === 'librarian'">
    <div class="searchField">
        <label>Search : </label> <input type="text" placeholder="Patron by id.." #filterpatron >
    </div> 
    <div class="btns">
        <button class=" btn btn-primary" type="button" (click)="filterResults(filterpatron.value)">Search</button>
        <button class=" btn btn-primary" type="button" [routerLink]="['/patron-registration']" [queryParams]="{ userType: userType ,username:username }" *ngIf="isAddPatronDisplay()" >Add Patron</button>
    </div>
  </div>
  <div class="tableClass">
    <table  class="patrons-table">
      <tr><th>ID</th><th>Name</th><th>Borrowed Books ISBN numbers</th></tr>
      <tr *ngFor="let patron of filteredPatronList" >
      <td>{{patron.id}}</td><td>{{patron.username}}</td><td>{{patron.borrowBooks}}</td>
      </tr>
    </table>
  </div>
</div>

    </div>
  </div>
  </main>
` ,
  styleUrls: ['./viewpatron.component.css']
})
export class ViewpatronComponent implements OnInit{
  toggleSideNav = true;
  showLogoutDropdown = false;
  userType: string ='';
  username: string = '';
  paramsObject : any;

  
  patronList : AllPatrons[];
  filteredPatronList : AllPatrons[] =[];
  constructor( private router: Router,private route: ActivatedRoute){

    const patronString = localStorage.getItem('PatronRegistrationData');
    const existingPatrons = patronString ? JSON.parse(patronString) : [];
    this.patronList = existingPatrons;

    console.log("patronlist ",this.patronList)
    // this.filteredPatronList = this.patronList;
    // console.log(this.filteredPatronList)
   

  }

  filterResults(filterValue: string) {
    
    if (!filterValue) {
      if (this.userType === 'librarian') {
        this.filteredPatronList = this.patronList;
      }

    } 
    else{
        this.filteredPatronList = this.patronList.filter(  patron => patron.id.toString() === filterValue)
    }
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

      if (this.userType === 'librarian') {
        this.filteredPatronList = this.patronList;
  
      } 
      else if (this.userType === 'patron') {
        console.log("patron list check," , this.patronList)
        console.log("username", this.username)
        const currentPatron = this.patronList.find((patron: AllPatrons) => patron.username === this.username);
        console.log("current patron",currentPatron)
        this.filteredPatronList = currentPatron ? [currentPatron] : [];
      }
      console.log("filtered patrn",this.filteredPatronList);
      
    });
  }

  isAddPatronDisplay(): boolean {
    return this.userType === 'librarian';
  }

  logout() {

    localStorage.removeItem(this.userType)

    this.router.navigateByUrl('/');
  }
}
