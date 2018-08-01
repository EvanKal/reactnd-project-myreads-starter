import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'


class BookSearchGrid extends React.Component {

  state = {

    booksArray: []

  }

componentDidUpdate(prevProps, prevState) {
  if(this.props.queryToRequest && this.props.queryToRequest !== prevProps.queryToRequest) {
  console.log("hi");
  BooksAPI.search(this.props.queryToRequest)
  .then((allBooksInSearch) => {
  this.setState({ booksArray: allBooksInSearch })
  })
  } else if(!this.props.queryToRequest && this.state.booksArray.length !== 0) {
  this.setState({ booksArray: [] })
}
}

// escapeSpecialCharacters(array) {
//   return this.state.booksArray.map((elem) => {
//   let stringified = "";
//   stringified = JSON.stringify(elem);
//   console.log("1", stringified);
//   let escpstrng = stringified.replace(/'/g , "a");
//   // let escpstrng = stringified.replace(/'/g , "\\\\\'");
//   console.log("2", escpstrng);
//   let newElem = JSON.parse(escpstrng);
//   console.log("3", newElem);
//   return newElem;
// })}

// escapeSpecialCharacters(array) {
//   return array.map((elem) => {
//   for(let property in elem) {
//     let content = elem[property];
//     let escaped = new RegExp(escapeRegExp(content), 'i');
//     return elem[property] = escaped;
//   }
// })}

render() {
  const { queryToRequest } = this.props
  const { booksArray } = this.state

  console.log(`Books displayed:`, booksArray)
  // console.log(`Books displayed:`, booksArray.map((elem) => {
  // return JSON.stringify(elem);}).join())
  console.log(`Prop query:`, queryToRequest);

  // let newArray= this.escapeSpecialCharacters(booksArray);
  // // console.log("OverHERE", newArray);
  // console.log(`Books displayed:`, newArray.map((elem) => {
  // return JSON.stringify(elem);}).join())



return (
  <div className="search-books-results">
    <ol className="books-grid">
    {booksArray.map((book) => {
      return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
          {book.imageLinks && (
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            )}
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
      )})}
    </ol>
  </div>

)


}
}


export default BookSearchGrid;