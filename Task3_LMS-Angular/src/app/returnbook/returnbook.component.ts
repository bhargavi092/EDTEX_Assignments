import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,NgForm,Validators } from '@angular/forms';
import { PatronService } from '../patron.service';
// import { BookServiceService } from '../book-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableBooks } from '../available-books';
import { AllPatrons } from '../all-patrons';

@Component({
  selector: 'app-returnbook',
  templateUrl: './returnbook.component.html',
  styleUrls: ['./returnbook.component.css']
})
export class ReturnbookComponent {

  toggleSideNav = true;
  showLogoutDropdown = false;
  returnForm : FormGroup;
  pid : number=0;
  isbn : string ="";

  userType: string ='';
  username: string = '';
  paramsObject : any;


  constructor(private formBuilder : FormBuilder , private patronService : PatronService, private router: Router,private route: ActivatedRoute){
    this.returnForm = formBuilder.group({
      pid : ['',Validators.required],
      isbn : ['',Validators.required],
    })
  }

  returnBook(){

    if (this.returnForm.valid) {
      const patronId = this.returnForm.controls['pid'].value;
      const bookISBN = this.returnForm.controls['isbn'].value;

      const patronDataString = localStorage.getItem('PatronRegistrationData');
      const patronData = patronDataString ? JSON.parse(patronDataString) : [];

      const patron = patronData.find((p: AllPatrons ) => p.id === patronId);

      if (!patron) {
        alert(`Patron with ID ${patronId} does not exist.`);
        return;
      }

      if (!patron.borrowBooks.includes(bookISBN) ) {
        alert(`Book with ISBN ${bookISBN} is not in the borrowed list.`);
        return;
      }

      const booksString = localStorage.getItem('books');
      const books = booksString ? JSON.parse(booksString) : [];

      const book = books.find((b:AvailableBooks) => b.isbn === bookISBN);

      if (!book) {
        alert(`Book with ISBN ${bookISBN} does not exist.`);
        return;
      }

      book.quantity++;

      const bookIndex = patron.borrowBooks.indexOf(bookISBN);
      console.log(bookIndex)
      if (bookIndex !== -1) {
        patron.borrowBooks.splice(bookIndex, 1);
      }

      localStorage.setItem('books', JSON.stringify(books));
      localStorage.setItem('PatronRegistrationData', JSON.stringify(patronData));

      alert(`Book with ISBN ${bookISBN} returned successfully.`);
      this.returnForm.reset();
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
