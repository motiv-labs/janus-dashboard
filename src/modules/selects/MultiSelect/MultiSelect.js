import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './MultiSelect.css';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class MultiSelect extends Component {
    state = {
        options: this.props.options,
        value: [],
    }

    getState = () => this.state;

    handleSelectChange = value => {
        this.setState((prevState, props) => ({ value }), this.props.input.onChange(value.split(',')));
    }

    render() {
        return (
            <Select
                {...this.props}
                multi
                simpleValue
                className="j-multiselect"
                value={this.state.value}
                placeholder="Choose one or more methods"
                options={this.props.options}
                onChange={this.handleSelectChange}
                onBlur={() => this.props.input.onBlur(this.props.input.value)}
            />
        );
    }
};

MultiSelect.propTypes = propTypes;

export default MultiSelect;
