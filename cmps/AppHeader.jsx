import { NavBar } from './NavBar.jsx'
import AddBook from '../pages/AddBook.jsx'


export default class AppHeader extends React.Component {
    render() {
        return (

            <header className="main-header">
                <h1>Ms.Book</h1>



                <AddBook />
                <NavBar />



            </header>
        )
    }
}