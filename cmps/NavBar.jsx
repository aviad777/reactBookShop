
const { Link } = ReactRouterDOM


export function NavBar() {
    return <nav className="nav-container">
        <ul>
            <li><Link to='/'>Home</Link> </li>
            <li><Link to='/about'> About </Link ></li>
            <li><Link to='/book'> Ms. Book </Link ></li>
        </ul>
    </nav>


}

