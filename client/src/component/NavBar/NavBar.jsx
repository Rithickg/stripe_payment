import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to=''><li>About</li></Link>
                <Link to=''><li>Services</li></Link>
                <Link to='/pricing'><li>Pricing</li></Link>
                <Link to=''><li>Contact</li></Link>
            </ul>
        </div>
    )
}
