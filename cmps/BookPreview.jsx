const { Link } = ReactRouterDOM
export default function BookPreview(props) {

    const { title, listPrice, id, thumbnail } = props.book
    const { book } = props


    return (
        <Link to={`/book/${id}`} >
            <article className="book-preview" >


                {title && <p className="preview-header">{title}</p>}
                {thumbnail && <img src={thumbnail}></img>}
                {listPrice && <p className="preview-price">Price: {listPrice.amount}</p>}

            </article ></Link>
    )

}