import React from 'react'
import PropTypes from 'prop-types'
import BookshelfChanger from "./BookshelfChanger"


class BookshelfBooks extends React.Component {

  state = {

  }

  render() {
    const { booksInShelf } = this.props

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
        {booksInShelf.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
              {book.imageLinks && (
                <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                )}
                {book.shelf && (
                <BookshelfChanger currentBook={book.id} currentShelf={book.shelf}/>
                )}
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
          </ol>
      </div>
    )
  }
}

export default BookshelfBooks;
