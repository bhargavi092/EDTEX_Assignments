import { Component , ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, FormBuilder,NgForm,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableBooks } from '../available-books';


@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
  
})
export class AddbookComponent {

    toggleSideNav = true;
    showLogoutDropdown = false;
    userType: string ='';
    username: string = '';
    paramsObject : any;

    addBookForm : FormGroup;
    // id : number=0;
    isbn : number=0;
    title : string ="";
    author : string="";
    quantity : number=0;


    constructor(private formBuilder : FormBuilder ,  private router:Router,private route: ActivatedRoute){
      this.addBookForm = formBuilder.group({
        // id : ['',Validators.required],
        isbn : ['',[Validators.required,Validators.maxLength(13)]],
        title : ['',Validators.required],
        author: ['',Validators.required],
        quantity: ['',Validators.required]
      })
    }

    addBook(){
      if(this.addBookForm.valid){
        console.log(this.addBookForm.value);
        
        const booksString = localStorage.getItem('books');
        const existingBooks = booksString ? JSON.parse(booksString) : [];
        const nextId = existingBooks.length;
        const newBook = this.addBookForm.value;

        const existingBookIndex = existingBooks.findIndex(
          (book: AvailableBooks) =>
            book.isbn === newBook.isbn
        );
        if (existingBookIndex !== -1) {
          const existingBook = existingBooks[existingBookIndex];
          
          if (existingBook.title !== newBook.title || existingBook.author !== newBook.author) {
            alert(`Book with ISBN ${newBook.isbn} already exists. ISBN numbers must be unique.`);
          }
          else {
            existingBook.quantity += newBook.quantity;
            alert('Book quantity increased successfully.');
          }
        } 
        else {
          newBook.id = nextId + 1;
          existingBooks.push(newBook);
          alert('Book added successfully.');
        }

      localStorage.setItem('books', JSON.stringify(existingBooks));

      this.addBookForm.reset()
      
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
