import React from 'react';
import PropTypes from 'prop-types';

import NewOAuthServerContainer from './newOAuthServerContainer';

const propTypes = {
    location: PropTypes.object.isRequired,
};

const NewOAuthServerPage = ({ location }) => <NewOAuthServerContainer location={location} />;

NewOAuthServerPage.propTypes = propTypes;

export default NewOAuthServerPage;
