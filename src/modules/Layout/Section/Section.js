import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    paddingTop: '10px',
    paddingBottom: '10px',
};

const propTypes = {
    children: PropTypes.node.isRequired,
};

const Section = ({ children }) => (
    <div style={styles}>
        {children}
    </div>
);

Section.propTypes = propTypes;

export default Section;
