import React from 'react'
import PropTypes from 'prop-types'
import BookshelfBooks from "./BookshelfBooks"
import { Link } from 'react-router-dom'


class BookSearch extends React.Component {

  state = {

  }

  render() {
    const { onChangeStateToFalse } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={() => onChangeStateToFalse()}>Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }


}

export default BookSearch;
