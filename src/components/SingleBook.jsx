import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBook({ token }) {
  // console.log("Token in SingleBook:", token);
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBook(data.book);
        // console.log("Book data:", data.book);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleCheckout = async () => {
    try {
      await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, 
        { available: false },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setBook({ ...book, available: false });
    } catch (error) {
      console.error('Error checking out book:', error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <img src={book.coverimage} alt={book.title} />
      <p>Available: {book.available ? 'Yes' : 'No'}</p>
      {book.available && token && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}

export default SingleBook;
