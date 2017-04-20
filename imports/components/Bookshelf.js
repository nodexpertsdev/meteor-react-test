import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectSheet } from '/imports/styling';
import Book from './Book';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export const BookshelfHelper = Wrapped => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedBookIds: [],
      };
    }

    bookSelected = bookId => {
      return this.state.selectedBookIds.indexOf(bookId) >= 0;
    };

    toggleBookSelection = bookId => {
      let newSelection = this.state.selectedBookIds;

      if (!this.bookSelected(bookId)) {
        newSelection = [...newSelection, bookId];
      } else {
        newSelection = newSelection.filter(id => id !== bookId);
      }

      this.setState({ selectedBookIds: newSelection });
    };

    clearSelection = () => {
      this.setState({ selectedBookIds: [] });
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          selectedBookIds={this.state.selectedBookIds}
          onToggleBookSelection={this.toggleBookSelection}
          clearSelection={this.clearSelection}
        />
      );
    }
  };
};

const Bookshelf = ({
  books,
  classes,
  onToggleBookSelection,
  selectedBookIds,
  clearSelection,
}) => {
  return (
    <div className={'bookshelf ' + classes.root}>
      {books.map((book, idx) => (
        <Book
          book={book}
          key={`book-${idx}`}
          selected={selectedBookIds.indexOf(book.etag) >= 0}
          onClick={onToggleBookSelection}
          clearSelection={clearSelection}
        />
      ))}
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleBookSelection: PropTypes.func.isRequired,
  selectedBookIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  clearSelection: PropTypes.func,
};

export default injectSheet(styles)(Bookshelf);
