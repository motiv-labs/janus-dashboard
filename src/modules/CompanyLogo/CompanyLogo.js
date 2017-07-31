import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';
import './CompanyLogo.css';

const b = block('company-logo');

const propTypes = {
    className: PropTypes.string,
};

const CompanyLogo = ({ className }) => (
    <span className={b.mix(className)}></span>
);

CompanyLogo.propTypes = propTypes;

export default CompanyLogo;
