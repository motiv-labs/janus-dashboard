import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// import './MultiSelect.css';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class SimpleSelect extends Component {
    state = {
        selectValue: ''
    }

    updateValue = (newValue) => {
        this.setState({
            selectValue: newValue
        });
    }

    render() {
        return (
            <Select
                className="j-select"
                {...this.props.input}
                value={this.state.selectValue}
                onChange={this.updateValue}
                simpleValue
                options={this.props.options}
                onBlur={() => {
                    this.props.input.onBlur(this.state.selectValue);
                }}
            />
        );
    }
};

SimpleSelect.propTypes = propTypes;

export default SimpleSelect;
