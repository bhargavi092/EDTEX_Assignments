import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,NgForm,Validators } from '@angular/forms';
import { AllPatrons } from '../all-patrons';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableBooks } from '../available-books';


@Component({
  selector: 'app-borrowbook',
  templateUrl: './borrowbook.component.html',
  styleUrls: ['./borrowbook.component.css']
})
export class BorrowbookComponent {
  
  toggleSideNav = true;
  showLogoutDropdown = false;

  borrowForm : FormGroup;
  pid : number=0;
  isbn : string ="";

  userType: string ='';
    username: string = '';
    paramsObject : any;
  // borrowedBooks : string[]=[""];


  constructor(private formBuilder : FormBuilder , private router: Router,private route: ActivatedRoute){
    this.borrowForm = formBuilder.group({
      pid : ['',Validators.required],
      isbn : ['',Validators.required],
    })
  }

  borrowBook(){

    if (this.borrowForm.valid) {
      const patronId = this.borrowForm.controls['pid'].value;
      const bookISBN = this.borrowForm.controls['isbn'].value;
  
      const patronDataString = localStorage.getItem('PatronRegistrationData');
      const patronData = patronDataString ? JSON.parse(patronDataString) : [];

      const patron = patronData.find((p:AllPatrons) => p.id === patronId);
  
      if (!patron) {
        alert(`Patron with ID ${patronId} does not exist.`);
        return;
      }
  
      const booksString = localStorage.getItem('books');
      const books = booksString ? JSON.parse(booksString) : [];

      const book = books.find((book:AvailableBooks) => book.isbn === bookISBN);
  
      if (!book) {
        alert(`Book with ISBN ${bookISBN} does not exist.`);
        return;
      }
  
      if (book.quantity <= 0) {
        alert(`Book with ISBN ${bookISBN} is not available.`);
        return;
      }
        book.quantity--;
  
      patron.borrowBooks.push(bookISBN);

  
      localStorage.setItem('books', JSON.stringify(books));
      localStorage.setItem('PatronRegistrationData', JSON.stringify(patronData));
  
      alert(`Book with ISBN ${bookISBN} borrowed successfully.`);
      this.borrowForm.reset();

      this.router.navigate(['/viewbook'], {queryParams: { userType:this.userType, username : this.username }})
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
  logout() {
    localStorage.removeItem(this.userType)
    this.router.navigateByUrl('/');
  }
}
