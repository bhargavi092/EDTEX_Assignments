import { Component, OnInit } from '@angular/core';
import { Leave } from '../User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {

  allLeaves: Leave[] = [];

  constructor(private httpClient:HttpClient){}

  ngOnInit(): void {


    this.httpClient.get<Leave[]>('http://localhost:8080/manager/overview')
      .subscribe(
        (leaves) => {
          this.allLeaves = leaves;
          console.log("at overview componet leaves")
        },
        (error) => {
          console.error('Error fetching non-pending leaves:', error);
        }
      );
  //   const leavesData = localStorage.getItem('leaves');
  //   //retrieving and storing all the leaves data so as to display it to the manager
  //   if (leavesData) {
  //     this.allLeaves = JSON.parse(leavesData);
  //     this.allLeaves = this.allLeaves.filter(
  //       (leave) => leave.status !== 'pending'
  //     );
  //   }
  //   const currentUserData = localStorage.getItem('currentUser')
  //   if(currentUserData){
  //     console.log("hi");
  //   }
  //   else{
  //     window.location.href='http://localhost:4200/login'
  //   }
    
   }
}
