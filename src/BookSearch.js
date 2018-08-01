import React from 'react'
import PropTypes from 'prop-types'
import BookshelfBooks from "./BookshelfBooks"
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'




class BookSearch extends React.Component {

  state = {

    allBooksInSearch: [],

    query: ""

  }

componentDidUpdate() {


}

  newSearchRequest = (query) => {
      BooksAPI.search(query).then((allBooksInSearch) => {
      this.setState({ allBooksInSearch })
    })
  }

  updateQuery = (query) => {
  this.setState({ query: query.trim() })
}

clearQuery = () => {
  this.setState({ query: '' })
}

  render() {
    const { onChangeStateToFalse } = this.props
    const { query,allBooksInSearch } = this.state

    console.log(this.state.allBooksInSearch)
    console.log(this.state.query)


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={() => onChangeStateToFalse()}>Close</Link>
          <div className="search-books-input-wrapper">

            <input
            className='search-books'
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => {this.updateQuery(event.target.value); if(query !== '') {this.newSearchRequest(query);} else {this.state.allBooksInSearch=[];}}}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {allBooksInSearch.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }


}

export default BookSearch;
