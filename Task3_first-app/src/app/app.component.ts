import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  standalone: true,
  imports : [
    HomeComponent,
    RouterModule
  ],
  template :`
    <main>
      <a [routerLink]="['/']">
          <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.png" alt="logo" aria-hidden="true" height="50">
          </header>
      </a>
      <section class="content">
        <!-- <app-home></app-home> -->
        <router-outlet></router-outlet>
      </section>
    </main>`,
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'homes';
}
