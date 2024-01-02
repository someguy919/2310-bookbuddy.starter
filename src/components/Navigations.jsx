import { NavLink } from "react-router-dom";

const Navigations = ({ user }) => {
    const isLoggedIn = user && user.email;

    const getNavLinkClass = ({ isActive }) => {
        return isActive ? 'activeLink' : '';
    };

    return (
        <nav>
            <NavLink to='/books' className={getNavLinkClass}>Books</NavLink>
            <NavLink to='/about' className={({ isActive }) => isActive ? 'activeLink' : ''}>About Us</NavLink>
            {isLoggedIn ? (
                <>
                    <NavLink to="/account" className={getNavLinkClass}>User</NavLink>
                    <NavLink to='/checked-out' className={getNavLinkClass}>Checked Out Books</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
                    <NavLink to='/register' className={getNavLinkClass}>Register</NavLink>
                   
                </>
            )}
        </nav>
    );
}

export default Navigations;
