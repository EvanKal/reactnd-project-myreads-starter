import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import BookshelfChanger from "./BookshelfChanger"



class BookSearchGrid extends React.Component {

  state = {

    booksArray: []

  }


//Handles searches for the valid strings and fetches the books,
// keeping the booksArray array empty when there is no valid search query
//Rerendering is based upon updating through receiving a new prop query
componentDidUpdate(prevProps, prevState) {

  if(this.props.queryToRequest && this.props.queryToRequest !== prevProps.queryToRequest) {
  BooksAPI.search(this.props.queryToRequest)
  .then((allBooksInSearch) => {
  this.setState({ booksArray: allBooksInSearch })
})}
  else if(!this.props.queryToRequest && this.state.booksArray.length !== 0) {
  this.setState({ booksArray: [] })
}}


render() {
  const { queryToRequest,bookShelfUpdated } = this.props
  const { booksArray } = this.state




return (
  <div className="search-books-results">
    <ol className="books-grid">
    {booksArray.map((book) => {
      let bookBeingMapped = book;
      let id2 = `id${book.id}`;

      return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
          {book.imageLinks && book.title && (
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            )}
              <BookshelfChanger
              bookShelfUpdated={bookShelfUpdated}
              bookObj={bookBeingMapped} currentBook={book.id} idForSelect={id2} currentShelf={book.shelf}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
      )})}
    </ol>
  </div>

)


}
}


export default BookSearchGrid;
