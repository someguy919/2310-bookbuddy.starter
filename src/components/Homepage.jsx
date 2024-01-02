import React from 'react';

const Homepage = ({ user }) => {
  
    const userName = user && (user.firstname || user.lastname) ? `${user.firstname} ${user.lastname}` : '';

    return(
        <div>
            <h2>Welcome {userName ? `back, ${userName}!` : 'to our library!'}</h2>
        </div>
    );
};

export default Homepage;
