import React from 'react';
import PropTypes from 'prop-types';

import NewApiContainer from './newApiContainer';

const propTypes = {
    location: PropTypes.object.isRequired,
};

const EditPage = ({ location }) => <NewApiContainer location={location} />;

EditPage.propTypes = propTypes;

export default EditPage;
