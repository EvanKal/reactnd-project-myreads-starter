import React from "react";
import PropTypes from "prop-types";
import escapeStringRegexp from "escape-string-regexp";
import * as BooksAPI from "./BooksAPI";

class BookshelfChanger extends React.Component {
  state = {};

  //Sets the select element's option to selected according to the book's shelf
  //If there is no shelf then it sets it to none
  selectOption = response => {
    if (response.shelf) {
      let selectElem = document.querySelector(
        `[name=${this.props.idForSelect}]`
      );
      let selected1 = selectElem.querySelector(`[value=${response.shelf}]`);
      selected1.setAttribute("selected", "");
    } else {
      let selectElem = document.querySelector(
        `[name=${this.props.idForSelect}]`
      );
      let selected1 = selectElem.querySelector(`[value=none]`);
      selected1.setAttribute("selected", "selected");
    }
  };

  //Since the books on the main page and on the search page get fetched from different urls,
  //if a book is placed on a shelf, this info must be retrieved from the main page url, when it's BookshelfChanger
  // component mounts. In the case of the search page, new fetches try to be rendered with every key press
  // and so catching the errors is essential in order to prevent the page from breaking, thus letting the latest fetch render
  componentDidMount() {
    let currentBook = this.props.currentBook;

    BooksAPI.get(currentBook)
      .then(response => {
        return response;
      })
      .then(response => {
        this.selectOption(response);
      })
      .catch(error => {
        return;
      });
  }

  // Updates the book's info by adding a shelf property and setting it's value to the selected shelf
  requestUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.props.bookShelfUpdated();
    });
  };

  changeShelf = e => {
    let selectedShelf = e.target.value;
    this.requestUpdate(this.props.bookObj, selectedShelf);
  };

  render() {
    const { bookObj, currentShelf, currentBook, idForSelect } = this.props;

    return (
      <div className="book-shelf-changer">
        <select name={idForSelect} onChange={this.changeShelf}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;
