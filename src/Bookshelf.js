import React from "react";
import PropTypes from "prop-types";
import BookshelfBooks from "./BookshelfBooks";

class Bookshelf extends React.Component {
  state = {};

  render() {
    const { nameOfShelf, booksInShelf, bookShelfUpdated } = this.props;
    const {} = this.state;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{nameOfShelf}</h2>
          <BookshelfBooks
            bookShelfUpdated={bookShelfUpdated}
            booksInShelf={booksInShelf}
          />
        </div>
      </div>
    );
  }
}

export default Bookshelf;
