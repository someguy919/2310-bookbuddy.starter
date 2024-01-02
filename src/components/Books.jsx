import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data.books);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Book List</h1>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <p>
                Showing {filteredBooks.length} out of {books.length} books
            </p>
            <ul>
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        <Link to={`/books/${book.id}`}>
                            {book.title} ({book.available ? 'Available' : 'Unavailable'})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
