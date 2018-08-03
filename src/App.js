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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
    bookShelfUpdated: false
  }

  componentDidUpdate(prevProps, prevState) {
  //   if (prevState.showSearchPage !== this.state.showSearchPage && this.state.showSearchPage == false) {
  //     console.log("SearchUpdate")
  // BooksAPI.getAll().then((allBooksList) => {
  //   this.setState({
  //   allBooksList: allBooksList,  bookShelfUpdated: false});
  // })}
    if(prevState.bookShelfUpdated !== this.state.bookShelfUpdated && this.state.bookShelfUpdated == true) {
      console.log("BookUpdate")
    BooksAPI.getAll().then((allBooksList) => {
      this.setState({allBooksList: allBooksList,  bookShelfUpdated: false});

    })
  }
}
  componentDidMount() {
  BooksAPI.getAll().then((allBooksList) => {
    this.setState({ allBooksList: allBooksList});
    // console.log(this.state.allBooksList);
  })
}

  // changeStateToFalse = () => {
  //   console.log("hi");
  //   // this.setState({showSearchPage: false});
  // }

  changeStateToFalseForUpdate = () => {
    console.log("YASSSS");
    this.setState({bookShelfUpdated: true});
    console.log(this.state.bookShelfUpdated)
  }

  render() {
    // console.log(this.state.showSearchPage)
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
