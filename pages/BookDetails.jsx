
import LongTxt from '../cmps/LongTxt.jsx';
import bookService from '../services/bookService.js';
import ReviewAdd from '../cmps/ReviewAdd.jsx';
import ReviewList from '../cmps/ReviewList.jsx'
const { Link } = ReactRouterDOM

export default class BookDetails extends React.Component {

    state = {
        book: null,
        prevNext: null,
        // publishedDateText: '',
        // pageCountText: 'medium reading',
        // priceClassName: '',
        reviews: [],
        review: ''
    }


    // handleChange = (ev) => {
    //     ev.preventDefault()
    //     var value = ev.target.value
    //     console.log('value', value);
    //     this.setState({ currReview: value })
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.match.pramas.theBookId != this.props.match.params.theBookId)
    //         this.loadBook();
    // }

    loadBook() {
        console.log('at load book');

        const id = this.props.match.params.theBookId
        console.log('the id in book detail:', id);
        bookService.getById(id)
            .then(book => {
                this.setState({ book });
                // bookService.getNextPrevBook(book.id)
                //     .then(prevNext => {
                //         // console.log('prev button', prevNext.prev)
                //         // console.log('next button', prevNext.next)
                //         this.prevNext = prevNext
                //         this.setState({ book });
                //     })
            })
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps)
        if (prevProps.match.params.theBookId !== this.props.match.params.theBookId) {
            console.log('componentDidUpdate ', prevProps.match.params.theBookId, ' ', this.props.match.params.theBookId)
            this.loadBook();
        }
    }



    // book = null;


    // componentDidUpdate() {
    //     // console.log('params', this.props.match.params);
    //     const id = this.props.match.params.theBookId;
    //     console.log('the id in component did mount:', id);
    //     // this.prevNext = bookService.getNextPrevBook();

    //     this.loadBook();
    //     // { pageCountText },
    // }

    componentDidMount() {
        // console.log('params', this.props.match.params);
        const id = this.props.match.params.theBookId;
        console.log('the id in component did mount:', id);
        // this.prevNext = bookService.getNextPrevBook();
        this.loadBook();
        // { pageCountText },
    }


    deleteReview = (reviewId) => {

        bookService.removeReview(this.state.book.id, reviewId)
            .then((book) => {
                this.setState({ book })

            })
            .catch((err) => console.log(err))

    }
    // Alon new!
    addReview = (bookId, reviewId) => {
        bookService.addReview(bookId, reviewId)
            .then((book) => this.setState({ book }))
            .catch(err => console.log(err));
    }



    render() {
        const { book } = this.state
        const loading = <p>Loading</p>
        if (!book) return (loading)


        let priceClassName = 'price';
        if (book.listPrice.amount > 150)
            priceClassName = 'price red';
        if (book.listPrice.amount < 20)
            priceClassName = 'price green';

        let curYear = new Date().getFullYear();
        let publishedDateText;
        if ((curYear - book.publishedDate) > 10) publishedDateText = 'Veteran Book';

        else if ((curYear - book.publishedDate) < 1) publishedDateText = 'new book';

        let pageCountText;
        if (book.pageCount > 500) pageCountText = 'Long read';
        else if (book.pageCount < 150) pageCountText = 'Light read';
        else pageCountText = 'Mediun read';

        // this.setState(
        //     { priceClassName, publishedDateText, pageCountText }
        // )
        // const { priceClassName, pageCountText, publishedDateText } = this.state
        // const { book } = this.state
        // var review = '';
        // console.log('book:', book);
        return (

            (!book) ? '' : <div className="book-details">
                <section className="book-sect">
                    <div className="book-detail-container">
                        <h3>Book Details</h3>
                        <h2>Title: {book.title}</h2>
                        <p>Subtitle: {book.subtitle}</p>
                        <p>authors: {book.authors.map((author, idx) => <span key={idx}>{author} </span>)}</p>
                        {/* <p>{book.authors}</p> */}
                        <p>Published date:{book.publishedDate} {publishedDateText}</p>

                        <p>description:</p>
                        <LongTxt text={book.description} length={100} />
                        <p>Page Count: {book.pageCount}</p>

                        <p>{book.pageCount}, {pageCountText}</p>

                        <p>categories: {book.categories.map((category, idx) => (<span key={idx}>{category}</span>))}</p>
                        <p>language:{book.language}</p>
                    </div>
                    <div className="book-details-image-container">
                        <img className="book-detail-image" src={book.thumbnail}></img>

                        {/* <textarea placeholder="You're review" name="currReview" value={currReview} onChange={this.handleChange} className="book-review"></textarea> */}

                        <p className={priceClassName}>price is:{book.listPrice.amount} in:{book.listPrice.currencyCode}</p>
                        {book.isOnSale ? <p>Book is on sale</p> : <p>Book isn`t on sale</p>}
                        <button onClick={() => {
                            console.log('PROPS', this.props);

                            this.props.history.goBack();
                        }}>Back</button>



                        {/* <div className="prev-next">
                        <Link to={`/car/${this.prevNext.prev}`} >prev</Link>
                        <Link to={`/car/${this.prevNext.next}`} >next</Link>
                    </div> */}
                    </div>
                </section>
                <section className="reviews-sect">
                    <ReviewAdd bookId={book.id} onAddReview={this.addReview} />
                    <ReviewList reviews={book.reviews} onDeleteReview={this.deleteReview} />
                </section>
            </div>
        )

    }

}



