import BookPreview from './BookPreview.jsx'

export default function BookList(props) {

    const { books } = props;

    return (

        <div className="list-container">
            {books && books.map(book => <BookPreview onSelectBook={props.onSelectBook} key={book.id} book={book} />)}
        </div>
    )
}