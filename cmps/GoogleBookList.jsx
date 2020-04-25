
export default function GoogleBooksList(props) {




    return (
        <ul className="found-book-list">
            {props.foundBooks.map((book, idx) => {
                return (
                    <li className='found-book-list-item' key={idx} onClick={() => props.onAddGoogleBook(book)}  > {book.volumeInfo.title}</li>
                )
            })}
        </ul >
    )
}



