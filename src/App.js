import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from "./Bookshelf"


class BooksApp extends React.Component {
  state = {
    allBooksList: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
  BooksAPI.getAll().then((allBooksList) => {
    console.log(allBooksList);
    this.setState({ allBooksList });
    // console.log(this.state);
  })
}

  render() {
    return (
      <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf
            nameOfShelf="Currently Reading"
            booksInShelf={this.state.allBooksList.filter((book) => book.shelf === "currentlyReading")}
          />
          <Bookshelf
            nameOfShelf="Want to Read"
            booksInShelf={this.state.allBooksList.filter((book) => book.shelf === "wantToRead")}
          />
          <Bookshelf
            nameOfShelf="Read"
            booksInShelf={this.state.allBooksList.filter((book) => book.shelf === "read")}
          />
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
      </div>


    )
  }
}

export default BooksApp;
