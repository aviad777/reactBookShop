import bookService from '../services/bookService.js'
import BookList from '../cmps/BookList.jsx'
import FilterBookList from '../cmps/FilterBookList.jsx'
import BookDetails from './BookDetails.jsx'
import AddBook from '../pages/AddBook.jsx'
import { eventBus } from '../services/eventBusService.js'


export default class BookShopApp extends React.Component {

    state = {
        books: null,
        selectedBook: null,
        filterBy: null
    }

    componentWillUnmount() {
        this.unsubscribeFromEventBus();
    }

    componentDidMount() {


        var isgoogleBookAdded = false;
        this.unsubscribeFromEventBus = eventBus.on('googleBookAdded', (newBook) => {
            // this.setState({ selectedBook: newBook })
            this.loadBooks()
            isgoogleBookAdded = true;

        })
        if (!isgoogleBookAdded)
            this.loadBooks()


    }


    onSelectBook = (selectedBook) => {
        this.setState({ selectedBook })


    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadBooks())

    }

    loadBooks() {

        const books = bookService.query(this.state.filterBy)
        this.setState({ books })
    }


    onAddGoogleBook = () => {
        this.loadBooks()
    }



    render() {
        const { books, selectedBook } = this.state
        return (
            <section>

                {selectedBook && <BookDetails book={selectedBook} />}
                {!selectedBook && <FilterBookList onSetFilter={this.onSetFilter} />}
                {!selectedBook && <BookList onSelectBook={this.onSelectBook} books={books} />}

            </section>
        )
    }

}