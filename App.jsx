const Router = ReactRouterDOM.HashRouter
const { Route } = ReactRouterDOM
const history = History.createBrowserHistory();



function Home() {
    return <section> Home</section>
}
function About() {
    return <section> About</section>
}

import AppHeader from './cmps/AppHeader.jsx'
import BookShopApp from './pages/BookShopApp.jsx'
import BookDetails from './pages/BookDetails.jsx'

import AddBook from './pages/AddBook.jsx'
import UsrMsg from './cmps/UsrMsg.jsx'

export class App extends React.Component {

    render() {
        return (
            <Router>
                <AppHeader history={history} />





                <main className="main-container">
                    <Route exact component={Home} path="/" />
                    <Route exact component={About} path="/about" />
                    <Route exact component={BookShopApp} path="/book" />
                    <Route component={BookDetails} path="/book/:theBookId" />
                </main>

                <footer>
                    <h2>copyrights 2020 &copy;</h2>
                </footer>
                <UsrMsg />
            </Router>
        )
    }
}

