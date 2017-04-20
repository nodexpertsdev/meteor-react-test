import React from 'react';
import PropTypes from 'prop-types';
import MyBooks from '/imports/components/MyBooks';

const MyBooksPage = ({ content, classes }) => {
  return <div>
    <MyBooks />
  </div>
};

MyBooksPage.propTypes = {};

export default MyBooksPage;
