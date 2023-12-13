import { useParams } from "react-router-dom"


const SingleBook = ({books}) => {
    const params = useParams()
    const id = params.id*1
    

    const singleBook = books.find((book) => {
        return book.id === id
    })

    

    if(!singleBook){
        return null
    }

    return(
        <div>
            <h1>Single Book</h1>
            <h3>{singleBook.title}</h3>
            <p>{singleBook.description}</p>

        </div>
    )
}

export default SingleBook