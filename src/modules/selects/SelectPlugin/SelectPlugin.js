import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './SelectPlugin.css';

const propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const SelectPlugin = ({ name, onChange, options }) => {
    return (
        <Select
            className="j-select"
            name={name}
            options={options}
            onChange={onChange}
        />
    );
};

export default SelectPlugin;
