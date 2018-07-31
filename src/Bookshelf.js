import React from 'react'
import PropTypes from 'prop-types'
import BookshelfBooks from "./BookshelfBooks"



class Bookshelf extends React.Component {

  state = {
  }

  render() {
    const { nameOfShelf,booksInShelf } = this.props
    const {  } = this.state

    console.log(booksInShelf);

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{nameOfShelf}</h2>
          <BookshelfBooks booksInShelf={booksInShelf}/>
        </div>
      </div>
    )
  }

}

export default Bookshelf;
