import React from 'react'
import PropTypes from 'prop-types'
import BookshelfBooks from "./BookshelfBooks"



class Bookshelf extends React.Component {

  state = {
    booksInShelf: []
  }

  render() {
    return (
      <div className="bookshelf">
        <h2></h2>
        <BookshelfBooks/>
      </div>
    )
  }

}

export default Bookshelf;
