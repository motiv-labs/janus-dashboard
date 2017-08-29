import React from 'react';
import PropTypes from 'prop-types';

import NewApiContainer from './newApiContainer';

const propTypes = {
    location: PropTypes.object.isRequired,
};

const NewApiPage = ({ location }) => <NewApiContainer location={location} />;

NewApiPage.propTypes = propTypes;

export default NewApiPage;
