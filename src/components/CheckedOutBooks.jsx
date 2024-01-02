import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckedOutBooks = ({ token }) => {
    const [checkedOutBooks, setCheckedOutBooks] = useState([]);

    useEffect(() => {
        const fetchCheckedOutBooks = async () => {
            if (token) {
                try {
                    const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    // console.log("API Response:", response.data);
                    setCheckedOutBooks(response.data.reservation); 
                } catch (error) {
                    console.error('Error fetching checked out books:', error);
                }
            }
        };
    
        fetchCheckedOutBooks();
    }, [token]);
    

    const handleReturn = async (reservationId) => {
        try {
            await axios.delete(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setCheckedOutBooks(checkedOutBooks.filter(book => book.id !== reservationId));
        } catch (error) {
            // console.error('Error returning book:', error);
        }
    };

    return (
        <div>
            <h2>Your Checked Out Books</h2>
            {checkedOutBooks.length === 0 ? (
                <p>You have no books checked out.</p>
            ) : (
                <ul>
                    {checkedOutBooks.map(book => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <button onClick={() => handleReturn(book.id)}>Return</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CheckedOutBooks;
