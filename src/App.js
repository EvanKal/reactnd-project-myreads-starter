import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from "./Bookshelf"
import BookSearch from "./BookSearch"
import BookshelfChanger from "./BookshelfChanger"


class BooksApp extends React.Component {
  state = {
    allBooksList: [],
    bookShelfUpdated: false
  }

//Allows rerendering only when the bookShelfUpdated "switch" changes to true and not back to false,
// so that a second rendering is prevented. When that happens the updated book list gets fetched
componentDidUpdate(prevProps, prevState) {
    if(prevState.bookShelfUpdated !== this.state.bookShelfUpdated && this.state.bookShelfUpdated == true) {
    BooksAPI.getAll().then((allBooksList) => {
      this.setState({allBooksList: allBooksList,  bookShelfUpdated: false});

    })
  }
}

//Gets books when page loads
componentDidMount() {
  BooksAPI.getAll().then((allBooksList) => {
    this.setState({ allBooksList: allBooksList});
  })
}

//Acts like a switch for rerendering when a book has its shelf changed on the main page
//This function is passed all the way down to the BookshelfChanger from where it gets called
  changeStateToFalseForUpdate = () => {
    this.setState({bookShelfUpdated: true});
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/'  render={() =>
      (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf
            bookShelfUpdated={this.changeStateToFalseForUpdate}
            nameOfShelf="Currently Reading"
            booksInShelf={this.state.allBooksList.filter((book) => book.shelf === "currentlyReading")}
          />
          <Bookshelf
            bookShelfUpdated={this.changeStateToFalseForUpdate}
            nameOfShelf="Want to Read"
            booksInShelf={this.state.allBooksList.filter((book) => book.shelf === "wantToRead")}
          />
          <Bookshelf
            bookShelfUpdated={this.changeStateToFalseForUpdate}
            nameOfShelf="Read"
            booksInShelf={this.state.allBooksList.filter((book) => book.shelf === "read")}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
      )}/>
      <Route path='/search' render={({ history }) => (
        <BookSearch
        bookShelfUpdated={this.changeStateToFalseForUpdate}
        onChangeStateToFalse={this.changeStateToFalse}
        />

      )}/>
      </div>


    )
  }
}

export default BooksApp;
