import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import Books from './collections/books';

export const saveBooks = new ValidatedMethod({
  name: 'saveBooks',

  validate: new SimpleSchema({
    books: Array,
    'books.$': { type: Object, blackbox: true },
    etags: Array,
    'etags.$': { type: String },
  }).validator(),

  run({ books, etags }) {
    try {
      // NOTE: The method used to create duplicate entries in the database.
      // Added deduping with an additional query and subsequent removal from books array.

      // Find duplicate etags
      const duplicates = Books.find({ etag: { $in: etags }}, { fields: { etag: 1 }})
        .fetch()
        .map(({ etag }) => etag);

      // Remove duplicates from books
      const booksToInsert = books.filter(book => {
        if(!duplicates.includes(book.etag)) return book;
      });

      // If all were duplicates, return successfully without any inserts
      if(!booksToInsert.length) return true;

      // Else insert non-duplicate books and return
      return Books.batchInsert(booksToInsert);
    } catch (e) {
      throw new Meteor.Error('save-error');
    }
  },
});

export const removeBooks = new ValidatedMethod({
  name: 'removeBooks',

  validate: new SimpleSchema({
    books: Array,
    'books.$': { type: String },
  }).validator(),

  run({ books }) {
    try {
      Books.remove({ etag: { $in: books }});
    } catch (e) {
      throw new Meteor.Error('remove-error');
    }
  },
});
