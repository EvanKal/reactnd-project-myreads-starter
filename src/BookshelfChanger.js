import React from 'react'
import PropTypes from 'prop-types'
import escapeStringRegexp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class BookshelfChanger extends React.Component {

  state = {

  }

idEscStr = () => {
  let id2 = `id${this.props.currentBook}`;
  console.log("ChangedID");
  return id2
}

selectOption = () => {
BooksAPI.get(this.props.currentBook).then((response) => {
  if(response.shelf) {
      let selectElem = document.querySelector(`[name=${this.idEscStr()}]`);
      let selected1 = selectElem.querySelector(`[value=${response.shelf}]`);
      selected1.setAttribute("selected", "");
  }else {
    let selectElem = document.querySelector(`[name=${this.idEscStr()}]`);
    let selected1 = selectElem.querySelector(`[value=none]`);
    selected1.setAttribute("selected", "selected");

  }
})
}

componentDidMount() {
  this.selectOption();
}

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
  const { bookObj,currentShelf,currentBook, } = this.props

  return (
    <div className="book-shelf-changer">
      <select name={this.idEscStr()} onChange={this.changeShelf}>
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
