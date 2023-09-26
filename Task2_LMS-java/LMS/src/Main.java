import java.util.*;

interface Borrowable{

    void borrow();
    void returnBook();

}

class Book implements Borrowable{

    private String title;
    private String author;
    private int ISBN;
    private int quantity;

    public Book ( String title , String author , int ISBN , int quantity){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.quantity = quantity;
    }

    public int getISBN(){
        return ISBN;
    }

    public String getTitle(){
        return title;
    }

    public String getAuthor(){
        return author;
    }

    public int getQuantity(){
        return quantity;
    }

    public int setDecrementQuantity(){
        return quantity--;
    }

    public int setIncrementQuantity(){
        return quantity++;
    }

    public String details(){
        return  title + "\t\t | " + author +"\t\t | " + ISBN +" \t\t | " + quantity ;
    }


    public void borrow() {
        System.out.println("Book borrowed successfully!");

    }

    public void returnBook() {
        System.out.println("Book returned successfully!");
    }
}


class Fiction extends Book {

    private String bookType="Fiction Book";

    public Fiction(String title , String author , int ISBN , int quantity){
        super(title,author,ISBN,quantity);
    }

    public String details(){
        return super.details() + "\t\t| " + bookType ;
    }
}

class NonFiction extends Book {

    private String bookType = "Non-Fiction Book";

    public NonFiction(String title , String author , int ISBN , int quantity){
        super(title,author,ISBN,quantity);
    }

    public String details(){
        return super.details() + "\t\t| " + bookType ;
    }
}

class Patron {

    private static int nextId=1;
    private String name;
    private int id ;
    private List<Book> borrowedBooks = new ArrayList<>();

    Patron(String name){
        this.name = name;
        this.id = nextId++;
    }

    public int getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public List<Book> getBorrowedBooks() { return  borrowedBooks;}


}


public class Main {

    static Map< Integer , Book > bookMap = new HashMap<>();
    static Map< Integer , Patron > patronMap = new HashMap<>();



    public void addBook(Book book){
        bookMap.put( book.getISBN() , book );
        System.out.println(" Book added successfully! ");
    }

    public void displayBooks(){
        if(bookMap.isEmpty()){
            System.out.println("No books are available!");
        }
        else {
            System.out.println("Available books are:");
            System.out.println("Title\t\t | Author\t\t | ISBN\t\t | Quantity\t| Book Type");
            System.out.println("-------------------------------------------------------------------");

            for (Book i : bookMap.values()){
//                System.out.println("Title :"+ i.getTitle() + " | Author:" + i.getAuthor() +" | ISBN:" + i.getISBN() +" | Quantity:" + i.getQuantity());
                System.out.println(i.details());
            }

        }

    }

    public  void removeBook(int isbn){
        if(bookMap.containsKey(isbn)){
            for( Patron j : patronMap.values()){
                if(j.getBorrowedBooks().stream().anyMatch(book -> book.getISBN() == isbn)){
                    System.out.println("This book is in borrowed books list!  Are you sure want to delete it? 1.Yes   2.No ");
                    Scanner sc = new Scanner(System.in);
                    int choice = sc.nextInt();
                    if(choice==1){
                        Book i = bookMap.get(isbn);
                        System.out.println(i.getTitle() + " Book was removed");
                        bookMap.remove(isbn);
                    }else if(choice==2){
                        System.out.println(" Book was not removed");
                    }else{
                        System.out.println(" Please enter valid number! ");
                    }
                    break;
                }
            }

        }
        else{
            System.out.println("Book is not found !");
        }


    }
    public void addPatron(Patron patron){
        patronMap.put(patron.getId() , patron);
        System.out.println("Patron added successfully!");
    }

    public void removePatron(int id){
        if(patronMap.containsKey(id)){
            Patron i = patronMap.get(id);
            System.out.println( i.getName() +" Patron was removed!");
            patronMap.remove(id);
        }
        else{
            System.out.println("patron is not found !");
        }

    }

    public void displayPatron(){
        if(patronMap.isEmpty()){
            System.out.println("No patrons are available!");
        }
        else{
            System.out.println("List of Patrons are: ");
            System.out.println("ID\t\t | Name\t\t | No. of borrowed books| Borrowed books");
            System.out.println("-------------------------------------------------------------------");
            for( Patron i : patronMap.values()){
                System.out.print( i.getId() + "\t\t | " + i.getName() +"\t\t | " + i.getBorrowedBooks().size()+"\t\t\t\t\t|" );

                boolean firstBook = true;
                for(Book borrowed : i.getBorrowedBooks()){
                    if(!firstBook){
                        System.out.print(",");
                    }
                    System.out.print(borrowed.getTitle());
                    firstBook= false;
                }
                System.out.println();
            }
        }

    }

    public static void main(String[] args ) {

        Scanner sc = new Scanner(System.in);

        Main library = new Main();

        while(true){
            System.out.println(" \n 1. Add a Book \n 2. Remove a Book \n 3. Display Books \n" +
                    " 4. Add Patron \n 5. Remove Patron \n 6. Display list of Patrons \n 7. Borrow a book \n 8. Return a Book \n 9. Exit \n");
            System.out.println("Enter Your choice:");
            int choice = sc.nextInt();

            switch (choice){

                case 1 :
                    System.out.println("Select Fiction book or Non-fiction book:");
                    System.out.println("1.Fiction");
                    System.out.println("2.Non-Fiction");
                    int booktype = sc.nextInt();
                    System.out.println("Enter Book Title: ");
                    String name = sc.next();
                    System.out.println("Enter Author Name: ");
                    String author = sc.next();
                    System.out.println("Enter ISBN number: ");
                    int isbn = sc.nextInt();
                    System.out.println("Enter Quantity: ");
                    int quantity = sc.nextInt();

                    if(booktype==1){
                        library.addBook( new Fiction(name,author,isbn,quantity));
                    }
                    else if(booktype==2){

                        library.addBook( new NonFiction(name,author,isbn,quantity));
                    }
                    else{
                        System.out.println("Please enter valid choice!");
                    }
                    break;

                case 2 :
                    System.out.println("Enter ISBN to remove book from the library:");
                    int remove = sc.nextInt();
                    library.removeBook(remove);
                    break;

                case 3 :
                    library.displayBooks();
                    break;

                case 4 :
                    System.out.println("Enter Patron Name: ");
                    String pname = sc.next();
                    library.addPatron(new Patron(pname));
                    break;

                case 5:
                    System.out.println("Enter Patron ID to remove: ");
                    int rid = sc.nextInt();
                    library.removePatron(rid);
                    break;

                case 6:
                    library.displayPatron();
                    break;

                case 7:
                    System.out.println("Enter Patron ID: ");
                    int patronId = sc.nextInt();
                    if (patronMap.containsKey(patronId)) {
                        Patron patron = patronMap.get(patronId);
                        System.out.println("Enter ISBN of the book to borrow: ");
                        int isbnToBorrow = sc.nextInt();
                        if (bookMap.containsKey(isbnToBorrow)) {
                            Book book = bookMap.get(isbnToBorrow);
                            System.out.println(book.details());
                            if(book.getQuantity()>0){
                                book.borrow();
                                book.setDecrementQuantity();
                                patron.getBorrowedBooks().add(book);
                            }else {
                                System.out.println("Can not Borrow book Quantity is 0");
                            }

                        } else {
                            System.out.println("Book not found!");
                        }
                    } else {
                        System.out.println("Patron not found!");
                    }
                    break;

                case 8:
                    System.out.println("Enter Patron ID: ");
                    int patronIdToReturn = sc.nextInt();
                    if (patronMap.containsKey(patronIdToReturn)) {
                        Patron patron = patronMap.get(patronIdToReturn);
                        System.out.println("Enter ISBN of the book to return: ");
                        int isbnToReturn = sc.nextInt();
                        for (Book book : patron.getBorrowedBooks()) {
                            if (book.getISBN() == isbnToReturn) {
                                book.returnBook();
                                book.setIncrementQuantity();
                                patron.getBorrowedBooks().remove(book);
                                break;
                            }
                        }
                    } else {
                        System.out.println("Patron not found!");
                    }
                    break;

                case 9 :
                    System.out.println("Thank You.....");
                    System.exit(0);
                    break;

                default:
                    System.out.println("Please enter valid number only!");
            }

        }

    }
}