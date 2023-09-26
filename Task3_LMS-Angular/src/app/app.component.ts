import { Component, importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
        <router-outlet></router-outlet>   
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LMS';
  librarianData : string | null ='';
  librarianObject :any;
  patronData : string | null ='';
  patronObject:any;

  constructor(private router:Router){
    this.librarianData = localStorage.getItem('librarian');
    this.patronData = localStorage.getItem('patron');

    console.log(this.librarianData)
    console.log(this.patronData)

    // localStorage.clear()


    if(this.librarianData === null && this.patronData === null){
        this.router.navigateByUrl('/')
    }
    else if(this.librarianData!= null){
      this.librarianObject = JSON.parse(this.librarianData)
      console.log(this.librarianObject.username)
      this.router.navigate(['/viewbook'], {queryParams: { userType:'librarian' , username:this.librarianObject.username}})
    }
    else if(this.patronData!= null){
      this.patronObject = JSON.parse(this.patronData)
      console.log(this.patronObject.username)
      this.router.navigate(['/viewbook'], {queryParams: { userType:'patron' , username:this.patronObject.username}})
    }

    // this.router.navigateByUrl('/registration')
  
  }
  
  
  
}
