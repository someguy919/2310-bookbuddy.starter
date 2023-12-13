import { Link } from "react-router-dom"

const Books = ({books}) => {

    return(
        <div>

            <h1>Books</h1>
            <ul>
                {
                    books.map((book) => {
                        return(
                            <li key={book.id}>
                                <Link  to={`/books/${book.id}`}>
                                    {book.title}
                                </Link>
                                <div>Available: {book.available ? "Yes" : "No"}</div>

                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Books