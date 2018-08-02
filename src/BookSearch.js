import React from 'react'
import PropTypes from 'prop-types'
import BookshelfBooks from "./BookshelfBooks"
import BookSearchGrid from "./BookSearchGrid"
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'




class BookSearch extends React.Component {

  state = {

    allBooksInSearch: [],

    query: "",

    searchTerms: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

  }

  // newSearchRequest = (query) => {
  //     BooksAPI.search(query).then((allBooksInSearch) => {
  //     this.setState({ allBooksInSearch })
  //   })
  // }

  turnSearchTermsToUp = () => {
    return this.state.searchTerms.map((elem) => {
      return elem.toUpperCase();
    })
  }

  returnValidSearchTerm = () => {
    let sTerms = this.turnSearchTermsToUp();
    if (sTerms.includes(this.state.query.toUpperCase())) {
      return this.state.query.toUpperCase();
    }
  }

  updateQuery = (query) => {
  this.setState({ query: query })
}

clearQuery = () => {
  this.setState({ query: '' })
}


  render() {
    const { onChangeStateToFalse,bookShelfUpdated } = this.props
    const { query,allBooksInSearch,searchTerms } = this.state

    console.log(this.state.query)

    // let sTerms = this.turnSearchTermsToUp();
    // console.log(sTerms);
    // console.log(query.toUpperCase());

    // if(sTerms.includes(query.toUpperCase())) {
    //   // this.newSearchRequest(query);
    // }


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input
            className='search-books'
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => {this.updateQuery(event.target.value); }}
            />

          </div>
        </div>
        <BookSearchGrid
        bookShelfUpdated={bookShelfUpdated}
        queryToRequest={this.returnValidSearchTerm()}/>
      </div>
    )
  }


}

export default BookSearch;
