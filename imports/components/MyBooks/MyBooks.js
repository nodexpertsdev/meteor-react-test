import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bookshelf, { BookshelfHelper } from '../Bookshelf';
import { injectSheet } from '/imports/styling';

const styles = {
  bookCount: {
    fontWeight: 'bold',
  },

  bookResults: {
    marginTop: 24,
  },

  manageButtons: {
    marginTop: 16,
  },
};

@injectSheet(styles)
@BookshelfHelper class MyBooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  bookSelectionUpdated = bookIds => {
    this.setState({ bookSelections: bookIds });
  };

  removeBooks = () => {
    const { selectedBookIds, removeBooks, clearSelection } = this.props;

    removeBooks.call({
      books: selectedBookIds
    }).then(success => {
      toastr.success(
        `${selectedBookIds.length} book${selectedBookIds.length > 1 ? 's' : ''} removed.`
      );
      clearSelection();
    }).catch(error => {
      toastr.error(`${error} Remove failed!`);
    });
  };

  renderActionArea = () => {
    if (!this.props.books.length) return null;

    const { classes } = this.props;

    return (
      <div>
        <div className={classes.bookCount}>
          {this.props.books.length} books in collection.
        </div>
        <div className={classes.manageButtons}>
          <button
            disabled={!this.props.selectedBookIds.length}
            onClick={this.removeBooks}
          >Remove from My Collection</button>
        </div>
        <div className={classes.bookResults}>
          <Bookshelf
            books={this.props.books}
            selectedBookIds={this.props.selectedBookIds}
            onToggleBookSelection={this.props.onToggleBookSelection}
            clearSelection={this.props.clearSelection}
          />
        </div>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.renderActionArea()}
      </div>
    );
  }
}

export default MyBooks;
