import bookService from "../services/bookService.js"
import GoogleBookList from "../cmps/GoogleBookList.jsx"
import utilService from "../services/utilService.jsx"
import { eventBus } from "../services/eventBusService.js"



export default class AddBook extends React.Component {

    state = {
        foundBooks: [],
        googleBook: null
    }

    addGoogleBook = (book) => {
        console.log('add google boook', book);

        let newBook = {};
        newBook.title = book.volumeInfo.title;
        newBook.subtitle = book.volumeInfo.subtitle || '';
        newBook.language = book.volumeInfo.language || '';
        newBook.id = utilService.makeId();
        newBook.isOnSale = true;
        newBook.categories = book.volumeInfo.categories || [];
        newBook.description = book.volumeInfo.description || '';
        newBook.publishedDate = book.volumeInfo.publishedDate || '';
        newBook.authors = book.volumeInfo.authors || [];
        newBook.pageCount = book.volumeInfo.pageCount || '';
        newBook.thumbnail = book.volumeInfo.imageLinks.thumbnail || '..Pics\imageNotFound.png';
        newBook.listPrice = { amount: 15, currency: 'euro' };

        console.log('new book id in add google book', newBook.id);

        bookService.addGoogleBook(newBook);

        this.setState({ googleBook: newBook })

        //add book with service
        eventBus.emit('googleBookAdded', newBook)
        eventBus.emit('book-added', { book: newBook, action: 'add' })

    }


    handleChange = ({ target }) => {
        this.setState({ googleBook: 'change' })
        let value = target.value
        if (value != '') {
            bookService.getApiBooks(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`)
                .then((res) => {

                    console.log('typing value', value);

                    this.setState({ foundBooks: res })

                })
        } else this.setState({ googleBook: null })

    }




    // handleChange = ({ target }) => {
    //     let value = target.value

    //     bookService.getApiBooks(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`)
    //         .then(res => {
    //             console.log('res for state:', res);

    //             this.setState({ foundBooks: res })
    //         })
    // }


    // handleChange = ({ target }) => {
    //     let value = target.value;
    //     booksService.getBooksFromApi(value)
    //         .then(res => {
    //             console.log(res)
    //             this.setState({ foundBooks: res })
    //         })
    // }




    render() {
        return (
            <section className="search-book-container" >
                <h3>Search a book:</h3>
                <form onSubmit={this.onSearchBook}>
                    <input className="search-book" type="text" name='search-book' onChange={this.handleChange} />
                </form>
                {/* <GoogleBookList onAddGoogleBook={this.addGoogleBook} foundBooks={this.state.foundBooks} /> */}
                {this.state.googleBook && <GoogleBookList onAddGoogleBook={this.addGoogleBook} foundBooks={this.state.foundBooks} />}
            </section>

        )
    }

}
