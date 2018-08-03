import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import BookshelfChanger from "./BookshelfChanger"



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
})}
  else if(!this.props.queryToRequest && this.state.booksArray.length !== 0) {
  this.setState({ booksArray: [] })
}}

// OVER HEEEEEEEEEEEEEEEEEEERE
// let newallBooksInSearch = allBooksInSearch.map((elem) => {
//   let id2 = `id${elem.id}`;
//   elem.id = id2;
//   console.log("ChangedID to:", id2);
//   return elem;
// })
// OVER HEEEEEEEEEEEEEEEEEEERE


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
  const { queryToRequest,bookShelfUpdated } = this.props
  const { booksArray } = this.state

  console.log(`RT! Books displayed:`, booksArray)
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
      let bookBeingMapped = book;
      let id2 = `id${book.id}`;

      return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
          {book.imageLinks && (
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            )}
              <BookshelfChanger
              bookShelfUpdated={bookShelfUpdated}
              bookObj={bookBeingMapped} currentBook={book.id} idForSelect={id2} currentShelf={book.shelf}/>
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
