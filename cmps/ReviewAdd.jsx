import bookService from '../services/bookService.js'
import { eventBus } from '../services/eventBusService.js'

export default class ReviewAdd extends React.Component {

    state = {
        review: {

            fullName: '',
            rate: '1',
            readAt: '',
            reviewTxt: ''
        }

    }

    handleInput = ({ target }) => {

        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                review: {
                    ...prevState.review,
                    [field]: value
                }
            }
        })

    }


    // onAddReview = (ev) => {

    //     ev.preventDefault()
    //     const id = this.props.bookId;
    //     bookService.addReview(id, this.state.review)
    //         .then((res) => (console.log(res)))
    //         .then((err) => (console.log(err)))

    // }


    //Alon new!

    onAddReview = (ev) => {
        ev.preventDefault()
        const id = this.props.bookId;
        this.props.onAddReview(id, this.state.review);
        eventBus.emit('book-details', { action: 'review' })
    }








    render() {
        const { fullName, rate, readAt, reviewTxt } = this.state.review;
        return (
            <div className="review-add" >

                <h4>Add Your review:</h4>
                <form className="review-form flex column align-center" onSubmit={this.onAddReview}>
                    <div className="first-details-container">
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" value={fullName} name="fullName" onChange={this.handleInput} />
                        <label htmlFor="rate">Rate:</label>
                        <select value={rate} name="rate" onChange={this.handleInput}>
                            <option key="1">1</option>
                            <option key="2">2</option>
                            <option key="3">3</option>
                            <option key="4">4</option>
                            <option key="5">5</option>
                        </select>
                    </div>
                    <div className="second-details-container">
                        <label htmlFor="readAt">Read At:</label>
                        <input type="date" name="readAt" value={readAt} onChange={this.handleInput} />
                        <label htmlFor="reviewTxt">Review:</label>
                        <textarea name="reviewTxt" value={reviewTxt} onChange={this.handleInput} />

                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}