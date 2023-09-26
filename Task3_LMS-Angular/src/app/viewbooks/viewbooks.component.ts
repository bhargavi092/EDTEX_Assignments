import { Component , OnInit} from '@angular/core';
import { AvailableBooks } from '../available-books';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewbooks',
  template: `<main>
   
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
      <a [routerLink]="['/viewbook']" [queryParams]="{ userType: userType ,username:username }"> Books</a>
      <a [routerLink]="['/viewpatron']" [queryParams]="{ userType: userType , username:username}"> Patrons</a>
      
    </div>
    <div class="content">
        <div class="viewbooks-container">
        <div class="viewbooks-heading"><h3>Available Books</h3></div>
        <div class="search">
            <div class="searchField">
              <label>Search: </label> <input type="text" placeholder="Book by name.." #filterbook>
            </div>
            <div class="btns">
              <button class=" btn btn-primary" type="button" (click)="filterResults(filterbook.value)">Search</button>
              <button class=" btn btn-primary" type="button" [routerLink]="['/addbook']" [queryParams]="{ userType: userType ,username:username }" *ngIf="isAddButtonDisplay()" >Add Book</button>
              <button class=" btn btn-primary" type="button" [routerLink]="['/borrowbook']" [queryParams]="{ userType: userType ,username:username }">Borrow Book</button>
              <button class=" btn btn-primary" type="button" [routerLink]="['/returnbook']" [queryParams]="{ userType: userType ,username:username }">Return Book</button>
            </div>
        </div>
        <div class="tableClass">
          <table  class="books-table">
            <tr><th>S.No</th><th>ISBN</th><th>Title</th><th>Author</th><th>Quantity</th></tr>
            <tr *ngFor="let book of filteredBookList" >
            <td>{{book.id}}</td><td>{{book.isbn}}</td><td>{{book.title}}</td><td>{{book.author}}</td><td>{{book.quantity}}</td>
            </tr>
          </table>
        </div>
</div>
    </div>
  </div>
  </main>`,
  styleUrls: ['./viewbooks.component.css']
})
export class ViewbooksComponent implements OnInit {
  toggleSideNav = true;
  showLogoutDropdown = false;
  userType: string ='';
  username: string = '';
  paramsObject : any;

  availableBooksList: AvailableBooks[];

  filteredBookList: AvailableBooks[] = [];

  constructor(private router: Router,private route: ActivatedRoute) {
      const booksString = localStorage.getItem('books');
      const existingBooks = booksString ? JSON.parse(booksString) : [];
      this.availableBooksList = existingBooks;
    // this.availableBooksList = this._bookService.availableBooksList;

    console.log('Available Books:', this.availableBooksList);
      this.filteredBookList = this.availableBooksList;
  } 

  filterResults(filterValue: string) {
    console.log('Filter Value:', filterValue);
    if (!filterValue) {
      this.filteredBookList = this.availableBooksList;
    }
    else {
      this.filteredBookList = this.availableBooksList.filter(book => book.title?.toLowerCase().includes(filterValue.toLowerCase()))
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
    });
  }

  isAddButtonDisplay(): boolean {
    return this.userType === 'librarian';
  }

  logout() {
    localStorage.removeItem(this.userType)
    this.router.navigateByUrl('/');
  }
}
