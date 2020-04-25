// import ReviewPreview from './BookPreview.jsx'


import LongTxt from 'LongTxt.jsx'
export default function ReviewList(props) {

    const { reviews } = props;

    return (
        <div className="reviews-container">
            {reviews && reviews.map(review => <ReviewPreview onDeleteReview={props.onDeleteReview} review={review} key={review.id} />)}
        </div>
    )
}


function ReviewPreview(props) {
    const { fullName, rate, readAt, reviewTxt, id } = props.review;
    return (
        <section class="review-list-item">
            <h3>{fullName}</h3>
            <h4>rate is:{rate} </h4>
            <p>read at {readAt}</p>
            <LongTxt text={reviewTxt} length={50} />
            <button className="del-review-btn" onClick={() => { props.onDeleteReview(id) }}>X</button>
        </section >
    )
}