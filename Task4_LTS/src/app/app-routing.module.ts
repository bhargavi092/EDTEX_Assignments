import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { EditLeaveComponent } from './edit-leave/edit-leave.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LoginComponent } from './login/login.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { NewRequestsComponent } from './new-requests/new-requests.component';
import { OverviewComponent } from './overview/overview.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsComponent } from './settings/settings.component';
import { TrackLeavesComponent } from './track-leaves/track-leaves.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    title:"Leave Tracking System"
  },
  {
    path:'login',
    component:LoginComponent,
    title:"Login"
  },
  {
    path:'register',
    component:RegistrationComponent,
    title:"Register"
  },
  {
    path:'employee',
    component:EmployeeDashboardComponent,
    children:[
      {
        path:'apply-leave',
        component:ApplyLeaveComponent,
        title:"Apply Leave"
      },
      {
        path:'track-leaves',
        component:TrackLeavesComponent,
        title:"Track Leaves"
      },
      {
        path:'edit-leave/:id',
        component:EditLeaveComponent,
        title:"Edit Leave"
      },
      {
        path:'leave-history',
        component:LeaveHistoryComponent,
        title:"Leave History"
      },
      {
        path:'',
        redirectTo:'leave-history',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'manager',
    component:ManagerDashboardComponent,
    children:[
      {
        path:'new-requests',
        component:NewRequestsComponent,
        title:"New Requests"
      },
      {
        path:'overview',
        component:OverviewComponent,
        title:"Overview"
      },
      {
        path:'settings',
        component:SettingsComponent,
        title:"Settings"
      },
      {
        path:'',
        redirectTo:'new-requests',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
