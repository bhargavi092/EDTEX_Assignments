import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Leave, UserRegister } from '../User';
import { HttpClient } from '@angular/common/http';

interface UserWithId extends UserRegister {
  id: String;
}
@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.css'],
})
export class NewRequestsComponent implements OnInit {
  isVisible = false;
  flag : boolean = true;
  id : string = ''

  showModal(flag : boolean , id : string): void {
    this.isVisible = true;
    this.flag = flag
    this.id = id
  }
  
  handleOk(): void {
    if(this.flag){
      // this.accept(this.id);
      this.reactToLeave(this.id,"Accepted")
    }
    else{
      // this.reject(this.id);
      this.reactToLeave(this.id,"Rejected")

    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  
  users: UserWithId[] = [];
  pendingLeaves:Leave[]= [] ;
  leaves: Leave[] = [];
  managerMessage: string = '';
  acceptIcon = faCheck;
  rejectIcon = faXmark;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {

    this.fetchPendingLeaves();
    
  }
  fetchUserName(){
    console.log("username")
  }
  fetchPendingLeaves(){
      
    this.httpClient.get<Leave[]>('http://localhost:8080/manager/new-requests').subscribe(
      (response) => {
        // this.pendingLeaves = response;
        this.pendingLeaves = response.map((leave) => {
          const userId = leave.id;
          
          this.fetchUserName()
          
          return leave;
        });
        console.log(this.pendingLeaves)
      },
      (error) => {
        console.error('Error fetching pending leaves:', error);
      }
    );
  }
  

  reactToLeave (id : String , status :String){
    const managerReason = this.managerMessage;

    console.log("checking id in react-to-leave",id);

    const requestBody = {
      userId: id,
      startDate: this.getStartDate(id),
      endDate: this.getEndDate(id),
      status: status,
      managerReason: managerReason,
    };

    this.httpClient
      .post('http://localhost:8080/manager/react-to-leave', {
        userId: id,
        startDate: this.getStartDate(id),
        endDate: this.getEndDate(id),
        status: status,
        managerReason: managerReason,
      })
      .subscribe(
        (response) => {
          console.log('Leave request updated:', response);
            this.fetchPendingLeaves();
          },
          (error) => {
            console.error('Error updating leave request:', error);
          }
        );
  
      this.isVisible = false;
    }
  
    getStartDate(id: String): String {
      const leave = this.pendingLeaves.find((leave) => leave.id === id);
      return leave ? leave.startDate : '';
    }
  getEndDate(id: String): String {
    const leave = this.pendingLeaves.find((leave) => leave.id === id);
    return leave ? leave.endDate : '';
  }
  
}
