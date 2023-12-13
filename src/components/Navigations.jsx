import { Link } from "react-router-dom"

const Navigations = () => {
    const token = window.localStorage.getItem('token')
    
    return (
        <nav>
            <Link to='/books'>Books</Link>
            {
                token ? (
                    <span>
                        <Link to="/account">User</Link>
                    </span>
                
                ) : (
                    
                    <span>
                        <Link to="/login">Login</Link>
                        <Link to='/register'>Register</Link>
                    </span>
                )
            }
        </nav>
    )
}

export default Navigations