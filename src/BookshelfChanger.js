import React from 'react'
import PropTypes from 'prop-types'
import escapeStringRegexp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class BookshelfChanger extends React.Component {

  state = {

  }

// idEscStr = () => {
//   let id2 = `id${this.props.currentBook}`;
//   console.log("ChangedID");
//   return id2
// }

selectOption = (response) => {
  if(response.shelf) {
      let selectElem = document.querySelector(`[name=${this.props.idForSelect}]`);
      let selected1 = selectElem.querySelector(`[value=${response.shelf}]`);
      selected1.setAttribute("selected", "");
  }else {
    let selectElem = document.querySelector(`[name=${this.props.idForSelect}]`);
    let selected1 = selectElem.querySelector(`[value=none]`);
    selected1.setAttribute("selected", "selected");

  }

}

componentDidMount() {
    let currentBook = this.props.currentBook

  BooksAPI.get(currentBook).then((response) => {
  console.log("resolving");
  return response;
  // resolve;
}).then((response) => {
  this.selectOption(response);
}).catch((error) => {
  console.log(error)
})}

// componentDidMount() {
//   const selOpt = this.selectOption;
//   const AbortController = window.AbortController;
//   const controller = new AbortController()
//   const signal = controller.signal
//   let currentBook = this.props.currentBook
//   let newPromise = new Promise (function (resolve, reject) {
// console.log("New Promise on the way")
//   BooksAPI.get(currentBook, signal).then((response) => {
//   console.log("resolving");
//   return response;
//   // resolve;
// }).then((response) => {
//   selOpt(response);
// }).catch(() => {
//   controller.abort()
// })
//
// }).catch((error) => {
//   console.log("rejecting")
//   // reject;
// })

// ---------This is SO cool!----------
// componentDidMount() {
//   const selOpt = this.selectOption;
//   const AbortController = window.AbortController;
//   const controller = new AbortController()
//   const signal = controller.signal
//   let currentBook = this.props.currentBook
//   let newPromise = new Promise (function (resolve, reject) {
// console.log("New Promise on the way")
//   BooksAPI.get(currentBook, signal).then((response) => {
//   console.log("resolving");
//   return response;
//   // resolve;
// }).then((response) => {
//   console.log("getting select option for response", response)
//   selOpt(response);
// }).catch(() => {
//   console.log("ERROR")
// })
//
// }).catch((error) => {
//   console.log("rejecting")
//   controller.abort()
//   // reject;
// })
// return newPromise;
// }




// componentDidUpdate() {
//   if (this.state.bookShelfUpdated !== false) {
//   this.setState({bookShelfUpdated: false});
// }
// }


requestUpdate = (book, shelf) => {
  BooksAPI.update(book, shelf).then((response) => {
    this.props.bookShelfUpdated();
    console.log("UpdateResponse", response)
  })
}

changeShelf = (e) => {
  // this.setState({bookShelfUpdated: true})
  let selectedShelf = e.target.value;
  this.requestUpdate(this.props.bookObj, selectedShelf);

}



render () {
  const { bookObj,currentShelf,currentBook,idForSelect } = this.props

  return (
    <div className="book-shelf-changer">
      <select name={idForSelect} onChange={this.changeShelf}>
        <option value="move" disabled >Move to...</option>
        <option value="currentlyReading" >Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}
}

export default BookshelfChanger;
