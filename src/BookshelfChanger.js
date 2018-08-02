import React from 'react'
import PropTypes from 'prop-types'
import escapeStringRegexp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class BookshelfChanger extends React.Component {

  state = {


  }

idEscStr = () => {
  let id2 = `id${this.props.currentBook}`;
  // let escpstrng1 = id2.replace(/\d/g , "a");
  // let escpstrng2 = escpstrng1.replace(/-/g , "b");
  return id2
}

selectOption = () => {
    let selectElem = document.querySelector(`[name=${this.idEscStr()}]`);
    let selected1 = selectElem.querySelector(`[value=${this.props.currentShelf}]`);
    console.log("HEY", selected1)
    selected1.setAttribute("selected", "selected");
    // debugger;
    // // let selectElem = document.querySelector("li" [this.key=this.props.currentBook]);
}

componentDidMount() {
  this.selectOption();
}


render () {
  const { currentShelf,currentBook } = this.props



  return (
    <div className="book-shelf-changer">
      <select name={this.idEscStr()}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}
}

export default BookshelfChanger;
