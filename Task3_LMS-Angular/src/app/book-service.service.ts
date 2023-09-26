import { Injectable } from '@angular/core';
import { AvailableBooks } from './available-books';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  availableBooksList : AvailableBooks [] = [
    {
      id : 1,
      isbn : 123,
      title : "Maha Prasthanam",
      author : "Srirangam Srinivasarao (Sri Sri)",
      quantity : 10
    },
    {
      id : 2,
      isbn : 234,
      title : "Gitanjali",
      author : "Rabindranath Tagore",
      quantity : 32
    },
    {
      id : 3,
      isbn : 345,
      title : "The Secret",
      author : "Rhonda Byrne",
      quantity : 15
    },
    {
      id : 4,
      isbn : 456,
      title : "Ramayana",
      author : "Valmiki",
      quantity : 60
    },
    {
      id : 5,
      isbn : 987,
      title : "Mahabharata",
      author : "Veda Vyasa",
      quantity : 80
    },
    {
      id : 6,
      isbn : 876,
      title : "Amruthadhara",
      author : "VChalam",
      quantity : 5
    },
    {
      id : 7,
      isbn : 692,
      title : "Naari",
      author : "Lakshminaryana",
      quantity : 22
    },
   
  ]

  addBook(book : AvailableBooks){
    const nextId = this.availableBooksList.length;
    const newBook: AvailableBooks = {
      ...book,
      id: nextId + 1
    };
    console.log(book);
    this.availableBooksList.push(newBook);
    console.log(this.availableBooksList)
  }

  borrowBook(isbn : number):boolean{
    const bookCheck = this.availableBooksList.findIndex(book => book.isbn === isbn);
    if (bookCheck !== -1 && this.availableBooksList[bookCheck].quantity > 0) {
      return true;
    } else {
      alert(`patron with id ${isbn} does not exists`);
      return false;
    }
  }

  reduceBookQuantity(isbn : number){
    const bookCheck = this.availableBooksList.find(book => book.isbn === isbn);
    if(bookCheck){
      bookCheck.quantity--;
    }
    
    return true;
  }

  increaseBookQuantity(isbn: number){
    const bookCheck = this.availableBooksList.find(book => book.isbn === isbn);
    if(bookCheck){
      bookCheck.quantity++;
    }
        return true;
  }
  constructor() {

   
   }
}
